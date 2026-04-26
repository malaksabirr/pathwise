import uuid
import json
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# ── Client OpenAI → GitHub Models (gratuit) ───────────────
client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=os.environ.get("GITHUB_API_KEY", ""),
)
MODEL = "gpt-4o-mini"


def _call(system: str, user: str, temperature: float = 0.4) -> str:
    """Appel générique au modèle."""
    response = client.chat.completions.create(
        model=MODEL,
        temperature=temperature,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    )
    return response.choices[0].message.content.strip()


def _parse_json(text: str) -> dict | list:
    """Nettoie et parse le JSON retourné par le modèle."""
    if "```" in text:
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


# ── Analyse de niveau ─────────────────────────────────────
async def analyze_level(profile: dict) -> dict:
    system = (
        "Tu es un expert pédagogique. Tu analyses des profils d'apprenants "
        "et détermines leur niveau. Réponds UNIQUEMENT en JSON valide, sans markdown."
    )
    user = f"""
Analyse ce profil et détermine le niveau de l'apprenant.

Profil :
- Sujet : {profile['subject']}
- Expérience déclarée : {profile['experience']}
- Objectif : {profile['goal']}
- Heures/semaine : {profile['hoursPerWeek']}

Réponds UNIQUEMENT avec ce JSON :
{{
  "level": "debutant" | "intermediaire" | "avance",
  "score": <entier 0-100>,
  "explanation": "<1 phrase motivante en français>"
}}
"""
    try:
        data = _parse_json(_call(system, user))
        return {
            "level": data["level"],
            "score": int(data["score"]),
            "explanation": data["explanation"],
        }
    except Exception:
        # Fallback si parsing échoue
        exp = profile.get("experience", "none")
        level_map = {
            "none": ("debutant", 15),
            "basics": ("debutant", 40),
            "some": ("intermediaire", 65),
            "professional": ("avance", 85),
        }
        level, score = level_map.get(exp, ("debutant", 20))
        return {"level": level, "score": score, "explanation": f"Niveau {level} détecté. C'est parti ! 🚀"}


# ── Génération de quiz ────────────────────────────────────
async def generate_quiz(subject: str, level: str, num_questions: int = 5) -> dict:
    system = (
        "Tu es un expert en création de quiz pédagogiques. "
        "Réponds UNIQUEMENT en JSON valide, sans markdown ni texte autour."
    )
    user = f"""
Génère exactement {num_questions} questions de quiz pour :
- Sujet : {subject}
- Niveau : {level}

Réponds UNIQUEMENT avec ce JSON :
{{
  "questions": [
    {{
      "text": "<question en français>",
      "options": ["<A>", "<B>", "<C>", "<D>"],
      "correctIndex": <0-3>,
      "explanation": "<explication courte en français>"
    }}
  ]
}}
"""
    try:
        data = _parse_json(_call(system, user, temperature=0.6))
        questions = [
            {"id": str(uuid.uuid4()), **q}
            for q in data["questions"][:num_questions]
        ]
    except Exception:
        # Fallback questions génériques
        questions = [
            {
                "id": str(uuid.uuid4()),
                "text": f"Question {i+1} sur {subject} (niveau {level})",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctIndex": 0,
                "explanation": "Option A est la bonne réponse.",
            }
            for i in range(num_questions)
        ]

    return {
        "id": str(uuid.uuid4()),
        "subject": subject,
        "level": level,
        "questions": questions,
    }


# ── Évaluation + feedback ─────────────────────────────────
async def evaluate_answers(quiz: dict, answers: list[dict]) -> dict:
    questions = {q["id"]: q for q in quiz["questions"]}
    results = []
    score = 0

    for answer in answers:
        q = questions.get(answer["questionId"])
        if not q:
            continue
        correct = answer["selectedIndex"] == q["correctIndex"]
        if correct:
            score += 1
        results.append({
            "questionId": answer["questionId"],
            "correct": correct,
            "explanation": q["explanation"],
        })

    total = len(quiz["questions"])
    percentage = round((score / total) * 100) if total > 0 else 0

    # Feedback via GPT
    try:
        feedback = _call(
            system="Tu es un coach pédagogique bienveillant. Réponds en 1-2 phrases max en français.",
            user=f"L'apprenant a eu {score}/{total} ({percentage}%) au quiz de {quiz['subject']} niveau {quiz['level']}. Génère un feedback motivant.",
            temperature=0.7,
        )
    except Exception:
        feedback = f"Tu as obtenu {score}/{total} — {'Excellent ! 🎉' if percentage >= 70 else 'Continue comme ça ! 💪'}"

    level_order = ["debutant", "intermediaire", "avance"]
    current_idx = level_order.index(quiz["level"])
    next_level = level_order[current_idx + 1] if percentage >= 70 and current_idx < 2 else None

    return {
        "score": score,
        "total": total,
        "percentage": percentage,
        "feedback": feedback,
        "nextLevel": next_level,
        "answers": results,
    }