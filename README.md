# 🧭 PathWise — Système Multi-Agent de Personnalisation de Parcours d'Apprentissage

> Projet académique — Système intelligent qui analyse le profil d'un apprenant, génère un parcours personnalisé via RAG + LLM, et adapte le contenu en temps réel grâce à un pipeline multi-agent orchestré par n8n.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![n8n](https://img.shields.io/badge/n8n-workflows-EA4B71?logo=n8n)
![GPT-4o](https://img.shields.io/badge/GPT--4o--mini-GitHub%20Models-412991?logo=openai)
![ChromaDB](https://img.shields.io/badge/ChromaDB-RAG-FF6B35)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND React                       │
│  Onboarding → Quiz → Niveau détecté → Parcours adapté   │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP REST
┌───────────────────────▼─────────────────────────────────┐
│                   BACKEND FastAPI                        │
│     /profile  /quiz  /admin  /webhook                    │
└──────────┬────────────────────────┬─────────────────────┘
           │                        │
┌──────────▼──────────┐  ┌──────────▼──────────────────────┐
│     n8n Workflows    │  │      GPT-4o-mini                 │
│  01 - Profiler       │  │   (via GitHub Models - gratuit)  │
│  02 - RAG + HITL     │  │  • Analyse niveau apprenant      │
│  03 - Quiz Gen       │  │  • Génération quiz adaptatif     │
│  04 - Evaluator      │  │  • Feedback personnalisé         │
└──────────┬──────────┘  └──────────────────────────────────┘
           │
┌──────────▼──────────┐
│     ChromaDB RAG     │
│  Ressources indexées │
│  Recherche sémantique│
└─────────────────────┘
```

---

## ✨ Fonctionnalités

- 🎯 **Onboarding intelligent** — Formulaire multi-étapes avec analyse de profil par IA
- 🧠 **Détection de niveau automatique** — GPT-4o-mini analyse l'expérience et les objectifs
- ⚡ **Quiz adaptatif** — Questions générées par IA selon le niveau réel de l'apprenant
- 📚 **Parcours personnalisé** — Ressources sélectionnées via RAG ChromaDB
- 👨‍💼 **Dashboard HITL** — Validation humaine des ressources avant publication
- 📊 **Suivi de progression** — Badges, XP, streak de connexion

---

## 🛠️ Stack Technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Python 3.11, Pydantic, Uvicorn |
| IA | GPT-4o-mini via GitHub Models (gratuit) |
| Orchestration | n8n (self-hosted) |
| RAG | ChromaDB, sentence-transformers |
| Auth API | GitHub Personal Access Token |

---

## 🚀 Lancement rapide

### Prérequis
- Node.js 20+
- Python 3.11+
- n8n installé localement

### Frontend
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env.local
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Remplis GITHUB_API_KEY
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs
```

### n8n
```bash
n8n start
# → http://localhost:5678
# Importer les workflows depuis n8n/
```

---

## 📁 Structure du projet

```
pathwise/
├── frontend/          # React + Vite + Tailwind
│   └── src/
│       ├── pages/     # HomePage, Onboarding, Quiz, Learning, Results, Admin
│       ├── components/# UI components réutilisables
│       ├── hooks/     # useProfile, useQuiz, useWorkflow
│       ├── services/  # API calls (axios)
│       └── context/   # AppContext (état global)
├── backend/           # FastAPI
│   └── app/
│       ├── routers/   # profile, quiz, admin, webhook
│       ├── services/  # llm_service, n8n_client
│       └── models/    # Pydantic schemas
├── n8n/               # Workflows exportés JSON
├── rag/               # ChromaDB + scripts d'ingestion
└── docs/              # Documentation technique
```

---

## 🔄 Flow utilisateur

```
1. /onboarding  → Profil + niveau estimé par GPT-4o-mini
2. /quiz        → 5 questions générées par IA
3. /learning    → Parcours adapté au niveau RÉEL
4. /results     → Badges + progression + recommandations
5. /admin       → Validation HITL des ressources (RAG)
```

---

## 👥 Équipe

| Membre | Rôle |
|--------|------|
| Malak Sabirr | Frontend + Backend + Architecture |
| Hiba Nasri | Backend + n8n Workflows + RAG |

---

## 📄 Variables d'environnement

```bash
# backend/.env (ne jamais commiter !)
GITHUB_API_KEY=github_pat_...     # GitHub Models (GPT-4o-mini gratuit)
N8N_BASE_URL=http://localhost:5678
GEMINI_API_KEY=...                 # Optionnel - backup LLM
```

---

*Projet réalisé dans le cadre du cours de systèmes multi-agents — 2025/2026*