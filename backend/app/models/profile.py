from pydantic import BaseModel
from typing import Literal

Level = Literal["debutant", "intermediaire", "avance"]
Subject = Literal["python", "javascript", "data_science", "machine_learning", "web_dev", "devops"]

class ProfileInput(BaseModel):
    name: str
    email: str
    subject: Subject
    goal: str
    hoursPerWeek: int
    experience: str

class LevelOutput(BaseModel):
    level: Level
    score: int
    explanation: str

class ProfileResponse(BaseModel):
    workflowId: str
    level: LevelOutput
    path: dict
