import httpx
from app.config import settings

BASE = settings.n8n_base_url
TIMEOUT = 30.0

async def trigger_profiler(payload: dict) -> dict:
    """Déclenche le workflow 01 — analyse du niveau apprenant."""
    url = f"{BASE}{settings.n8n_profiler_webhook}"
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        return r.json()

async def trigger_resource(payload: dict) -> dict:
    """Déclenche le workflow 02 — RAG + WebSearch + HITL."""
    url = f"{BASE}{settings.n8n_resource_webhook}"
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        return r.json()

async def trigger_quiz(payload: dict) -> dict:
    """Déclenche le workflow 03 — génération du quiz."""
    url = f"{BASE}{settings.n8n_quiz_webhook}"
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        return r.json()

async def trigger_evaluator(payload: dict) -> dict:
    """Déclenche le workflow 04 — scoring + adaptation niveau."""
    url = f"{BASE}{settings.n8n_evaluator_webhook}"
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        return r.json()

async def notify_admin_decision(resource_id: str, decision: str, reason: str = "") -> dict:
    """Notifie n8n d'une décision HITL admin."""
    url = f"{BASE}/webhook/admin-decision"
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(url, json={"resourceId": resource_id, "decision": decision, "reason": reason})
        r.raise_for_status()
        return r.json()
