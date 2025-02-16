# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Backend работает"}

@app.get("/generate")
def generate_task():
    return {"task": "Пример задачи по пожарной тактике"}
