from fastapi import APIRouter, HTTPException, Query
from app.models.quiz import Quiz, AnswerSubmission, QuizResult
from app.services import llm_service, n8n_client

router = APIRouter(prefix="/quiz", tags=["quiz"])

# Cache en mémoire des quiz générés
_quizzes: dict[str, dict] = {}

@router.get("", response_model=Quiz)
async def get_quiz(
    subject: str = Query(..., description="Sujet du quiz"),
    level: str = Query(..., description="Niveau: debutant | intermediaire | avance"),
):
    """
    Génère un quiz adaptatif via Gemini ou le récupère depuis n8n.
    Le quiz est mis en cache par (subject, level).
    """
    cache_key = f"{subject}:{level}"

    if cache_key in _quizzes:
        return _quizzes[cache_key]

    try:
        # Tente via n8n d'abord
        try:
            quiz_data = await n8n_client.trigger_quiz({"subject": subject, "level": level})
            if quiz_data and "questions" in quiz_data:
                _quizzes[cache_key] = quiz_data
                return quiz_data
        except Exception:
            pass

        # Fallback : génération directe via Gemini
        quiz = await llm_service.generate_quiz(subject, level)
        _quizzes[quiz["id"]] = quiz
        _quizzes[cache_key] = quiz
        return quiz

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur génération quiz: {str(e)}")


@router.post("/answers", response_model=QuizResult)
async def submit_answers(submission: AnswerSubmission):
    """
    Reçoit les réponses de l'apprenant, calcule le score via Gemini,
    déclenche le workflow n8n d'évaluation.
    """
    quiz = _quizzes.get(submission.quizId)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz introuvable. Régénère le quiz.")

    try:
        answers_dicts = [a.model_dump() for a in submission.answers]

        # Évaluation via Gemini
        result = await llm_service.evaluate_answers(quiz, answers_dicts)

        # Notifie n8n workflow 04 (évaluateur)
        try:
            await n8n_client.trigger_evaluator({
                "quizId": submission.quizId,
                "subject": quiz["subject"],
                "level": quiz["level"],
                "result": result,
            })
        except Exception:
            pass

        return QuizResult(**result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
