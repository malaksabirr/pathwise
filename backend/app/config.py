from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Gemini
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash-preview-04-17"  # ← ajoute cette ligne
    # n8n
    n8n_base_url: str = "http://localhost:5678"
    n8n_profiler_webhook: str = "/webhook/profiler"
    n8n_resource_webhook: str = "/webhook/resource"
    n8n_quiz_webhook: str = "/webhook/quiz"
    n8n_evaluator_webhook: str = "/webhook/evaluator"
    # App
    app_secret: str = "changeme"
    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()