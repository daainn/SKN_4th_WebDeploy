from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os
from dotenv import load_dotenv

# .env 파일을 로드하여 환경 변수 설정
load_dotenv()

# 환경 변수에서 API 키를 불러옵니다
API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# 모델 로드
model_name = "Gwangwoon/muse2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# FastAPI 앱 설정
app = FastAPI()

@app.get("/")
async def read_root():
    return {"API_KEY": API_KEY}
