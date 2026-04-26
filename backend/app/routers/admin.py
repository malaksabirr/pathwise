from fastapi import APIRouter, HTTPException
from app.models.quiz import AdminResource, RejectPayload
from app.services import n8n_client
from datetime import datetime
import uuid

router = APIRouter(prefix="/admin", tags=["admin"])

# Stockage en mémoire (remplace par DB en prod)
_resources: dict[str, dict] = {
    "demo-1": {
        "id": "demo-1",
        "title": "Python pour les débutants - FreeCodeCamp (4h)",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "type": "video",
        "subject": "python",
        "submittedAt": datetime.now().isoformat(),
        "status": "pending",
        "description": "Cours complet Python pour débutants absolus, couvre les bases jusqu'aux fonctions.",
    },
    "demo-2": {
        "id": "demo-2",
        "title": "Real Python - Decorators in Python",
        "url": "https://realpython.com/primer-on-python-decorators/",
        "type": "article",
        "subject": "python",
        "submittedAt": datetime.now().isoformat(),
        "status": "pending",
        "description": "Guide complet et illustré sur les décorateurs Python avec exemples pratiques.",
    },
    "demo-3": {
        "id": "demo-3",
        "title": "Exercice : Algorithmes de tri en Python",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "type": "exercice",
        "subject": "python",
        "submittedAt": datetime.now().isoformat(),
        "status": "approved",
        "description": "Implémenter bubble sort, merge sort et quicksort from scratch.",
    },
    "demo-4": {
        "id": "demo-4",
        "title": "Projet : Construire une API REST avec FastAPI",
        "url": "https://fastapi.tiangolo.com/tutorial/",
        "type": "projet",
        "subject": "python",
        "submittedAt": datetime.now().isoformat(),
        "status": "pending",
        "description": "Projet guidé pour créer une API complète avec FastAPI, SQLite et authentification JWT.",
    },
}


@router.get("/resources", response_model=list[AdminResource])
async def get_resources():
    """Retourne toutes les ressources soumises par n8n pour validation HITL."""
    return list(_resources.values())


@router.post("/resources/{resource_id}/approve")
async def approve_resource(resource_id: str):
    """Approuve une ressource et notifie n8n."""
    if resource_id not in _resources:
        raise HTTPException(status_code=404, detail="Ressource introuvable")

    _resources[resource_id]["status"] = "approved"

    try:
        await n8n_client.notify_admin_decision(resource_id, "approved")
    except Exception:
        pass  # n8n pas encore configuré

    return {"message": "Ressource approuvée", "id": resource_id}


@router.post("/resources/{resource_id}/reject")
async def reject_resource(resource_id: str, payload: RejectPayload):
    """Rejette une ressource avec une raison et notifie n8n."""
    if resource_id not in _resources:
        raise HTTPException(status_code=404, detail="Ressource introuvable")

    _resources[resource_id]["status"] = "rejected"

    try:
        await n8n_client.notify_admin_decision(resource_id, "rejected", payload.reason)
    except Exception:
        pass

    return {"message": "Ressource rejetée", "id": resource_id, "reason": payload.reason}


@router.post("/resources")
async def add_resource(resource: AdminResource):
    """Endpoint pour n8n — soumet une nouvelle ressource à valider."""
    _resources[resource.id] = resource.model_dump()
    return {"message": "Ressource ajoutée", "id": resource.id}
