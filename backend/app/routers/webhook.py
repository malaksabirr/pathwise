from fastapi import APIRouter, Request
import logging

router = APIRouter(prefix="/webhook", tags=["webhook"])
logger = logging.getLogger(__name__)

# Stockage en mémoire des callbacks n8n
_workflow_results: dict[str, dict] = {}

@router.post("/n8n/profiler-done")
async def profiler_done(request: Request):
    """
    Callback n8n → workflow 01 terminé.
    Reçoit le niveau détecté et met à jour le workflow.
    """
    data = await request.json()
    workflow_id = data.get("workflowId")
    if workflow_id:
        _workflow_results[workflow_id] = {
            "status": "done",
            "level": data.get("level"),
        }
    logger.info(f"Profiler done: {workflow_id}")
    return {"received": True}


@router.post("/n8n/resources-ready")
async def resources_ready(request: Request):
    """
    Callback n8n → workflow 02 terminé.
    Reçoit la liste des ressources générées (après RAG + HITL).
    """
    data = await request.json()
    workflow_id = data.get("workflowId")
    if workflow_id:
        _workflow_results[workflow_id] = {
            **_workflow_results.get(workflow_id, {}),
            "resources": data.get("resources", []),
            "status": "done",
        }
    logger.info(f"Resources ready: {workflow_id}")
    return {"received": True}


@router.post("/n8n/quiz-ready")
async def quiz_ready(request: Request):
    """
    Callback n8n → workflow 03 terminé.
    Reçoit le quiz généré.
    """
    data = await request.json()
    logger.info(f"Quiz ready: {data.get('quizId')}")
    return {"received": True}


@router.post("/n8n/evaluation-done")
async def evaluation_done(request: Request):
    """
    Callback n8n → workflow 04 terminé.
    Reçoit le score final et la recommandation de niveau.
    """
    data = await request.json()
    logger.info(f"Evaluation done: {data}")
    return {"received": True}


def get_workflow_result(workflow_id: str) -> dict | None:
    return _workflow_results.get(workflow_id)
