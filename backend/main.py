from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import profile, quiz, admin, webhook

app = FastAPI(
    title="PathWise API",
    description="Système multi-agent de personnalisation de parcours d'apprentissage",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────
app.include_router(profile.router)
app.include_router(quiz.router)
app.include_router(admin.router)
app.include_router(webhook.router)

# ── Health check ──────────────────────────────────────────
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "PathWise API",
        "version": "1.0.0",
    }

@app.get("/")
async def root():
    return {
        "message": "PathWise API 🚀",
        "docs": "/docs",
        "health": "/health",
    }
