from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

# Qwen2.5-7B 모델 로드
tokenizer = AutoTokenizer.from_pretrained("Gwangwoon/muse2", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("Gwangwoon/muse2", device_map="auto", torch_dtype=torch.float16, trust_remote_code=True)
model.eval()

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    prompt = f"User: {req.question}\nAssistant:"
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to(model.device)
    with torch.no_grad():
        output = model.generate(input_ids, max_new_tokens=300)
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    answer = response.split("Assistant:")[-1].strip()
    return ChatResponse(answer=answer)
