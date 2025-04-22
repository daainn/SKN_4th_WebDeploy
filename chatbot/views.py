from django.shortcuts import render
import requests

def query_docent_bot(question: str) -> str:
    url = "https://1p7peu7026lfk0-8002.proxy.runpod.net/chat"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "question": question
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        return response.json().get("answer", "❓ 응답에 문제가 있어요.")
    except requests.exceptions.RequestException as e:
        return f"❌ 서버 요청 실패: {e}"




def logo_page(request):
    return render(request, 'logo-page.html') 

def landing_page(request):
    return render(request, 'landing-page.html')  

def explain_page(request):
    return render(request, 'explain-page.html')  
def chatbot_page(request):
    answer = ""
    question = ""

    if request.method == "POST":
        question = request.POST.get("question", "")
        if question:
            answer = query_docent_bot(question)

    return render(request, 'chatbot-page.html', {
        "answer": answer,
        "question": question
    })
