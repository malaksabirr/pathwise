import uuid
from fastapi import APIRouter, HTTPException
from app.models.profile import ProfileInput, ProfileResponse, LevelOutput
from app.services import llm_service, n8n_client

router = APIRouter(prefix="/profile", tags=["profile"])

# Stockage en mémoire (remplace par Redis/DB en prod)
_workflows: dict[str, dict] = {}

@router.post("", response_model=ProfileResponse)
async def submit_profile(profile: ProfileInput):
    """
    Reçoit le profil de l'apprenant, analyse son niveau via Gemini,
    déclenche le workflow n8n de génération de parcours.
    """
    try:
        # 1. Analyse du niveau via Gemini
        level_data = await llm_service.analyze_level(profile.model_dump())
        level = LevelOutput(**level_data)

        # 2. Génère un workflowId unique
        workflow_id = str(uuid.uuid4())

        # 3. Déclenche n8n workflow 01 (profiler) + 02 (resources)
        n8n_payload = {
            "workflowId": workflow_id,
            "profile": profile.model_dump(),
            "level": level.model_dump(),
        }

        try:
            await n8n_client.trigger_profiler(n8n_payload)
        except Exception:
            # n8n pas encore configuré → on continue quand même
            pass

        # 4. Stocke l'état du workflow
        _workflows[workflow_id] = {
            "status": "done",  # "pending" si n8n asynchrone
            "level": level.model_dump(),
        }

        # Parcours par défaut (sera remplacé par la réponse n8n)
        default_path = {
            "id": str(uuid.uuid4()),
            "subject": profile.subject,
            "level": level.level,
            "resources": [],
            "estimatedDuration": f"{profile.hoursPerWeek * 4}h/mois",
        }

        return ProfileResponse(
            workflowId=workflow_id,
            level=level,
            path=default_path,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{workflow_id}")
async def get_status(workflow_id: str):
    """Polling du statut du workflow n8n."""
    if workflow_id not in _workflows:
        raise HTTPException(status_code=404, detail="Workflow introuvable")
    return _workflows[workflow_id]
