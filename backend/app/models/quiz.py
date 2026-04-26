from pydantic import BaseModel
from typing import Literal

Level = Literal["debutant", "intermediaire", "avance"]
Subject = Literal["python", "javascript", "data_science", "machine_learning", "web_dev", "devops"]

class Question(BaseModel):
    id: str
    text: str
    options: list[str]
    correctIndex: int
    explanation: str

class Quiz(BaseModel):
    id: str
    subject: Subject
    level: Level
    questions: list[Question]

class Answer(BaseModel):
    questionId: str
    selectedIndex: int

class AnswerSubmission(BaseModel):
    quizId: str
    answers: list[Answer]

class AnswerResult(BaseModel):
    questionId: str
    correct: bool
    explanation: str

class QuizResult(BaseModel):
    score: int
    total: int
    percentage: int
    feedback: str
    nextLevel: Level | None
    answers: list[AnswerResult]

class AdminResource(BaseModel):
    id: str
    title: str
    url: str
    type: Literal["video", "article", "exercice", "projet"]
    subject: Subject
    submittedAt: str
    status: Literal["pending", "approved", "rejected"]
    description: str

class RejectPayload(BaseModel):
    reason: str
