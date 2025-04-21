const translations = {
  ko: {
    title: "MUSE",
    subtitle: "국립중앙박물관 챗봇",
    questionPlaceholder: "무엇이 궁금하세요?",
    copyright: "©copyright 본 이미지와 자료는 국립중앙박물관으로부터 제공 받았습니다."
  },
  en: {
    title: "MUSE",
    subtitle: "National Museum Chatbot",
    questionPlaceholder: "Ask your question",
    copyright: "©copyright These images and materials were provided by the National Museum of Korea."
  },
  ja: {
    title: "MUSE",
    subtitle: "国立中央博物館 チャットボット",
    questionPlaceholder: "質問を入力してください",
    copyright: "©copyright これらの画像と資料は国立中央博物館より提供されたものです。"
  }
};

function setLang(button, lang) {
  document.querySelectorAll(".language-buttons button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  const t = translations[lang];
  if (t) {
    document.getElementById("userQuestion").placeholder = t.questionPlaceholder;
    document.getElementById("chatSubtitle").innerText = t.subtitle;
    document.getElementById("copyright").innerText = translations[lang].copyright;
  }
}

function handleQuestion(event) {
  event.preventDefault();
  const input = document.getElementById('userQuestion');
  const question = input.value.trim();
  if (!question) return;

  const chatContent = document.getElementById('chatContent');

  const userDiv = document.createElement('div');
  userDiv.className = 'message user-message';
  userDiv.textContent = question;
  chatContent.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.className = 'message bot-response';
  botDiv.textContent = '...';  // 로딩 상태 표시
  chatContent.appendChild(botDiv);

  // FastAPI 서버에 질의 요청
  fetch('http://127.0.0.1:8000/generate/', {  // FastAPI URL로 요청
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: question }),  // 질문을 JSON으로 보내기
  })
  .then(response => response.json())
  .then(data => {
    const generatedText = data.generated_text;  // FastAPI 응답
    const apiKey = data.api_key;  // FastAPI에서 받은 API 키
    console.log("API Key: ", apiKey);  // API 키 사용 예시
    botDiv.innerHTML = `
      ${generatedText}
      <br><br>
      <img src="{% static 'image/winter-landscape.png' %}" alt="겨울산수" class="response-image">
      <audio controls class="response-audio">
        <source src="{% static 'sample.mp3' %}" type="audio/mpeg">
        오디오 지원이 불가합니다.
      </audio>
    `;
    chatContent.appendChild(botDiv);
  })
  .catch(error => {
    botDiv.innerText = 'Error: 서버와의 통신이 실패했습니다.';
  });

  input.value = '';  // 입력창 비우기
  chatContent.scrollTop = chatContent.scrollHeight;  // 스크롤 하단으로 이동
}

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang") || localStorage.getItem("selectedLang") || "ko";

  // 선택된 언어를 localStorage에 저장하여 유지
  localStorage.setItem("selectedLang", lang);

  // 언어 설정 함수 호출
  const langButton = Array.from(document.querySelectorAll(".top-bar button"))
    .find(btn => btn.textContent.toLowerCase().includes(lang === "ko" ? "한국" : lang === "en" ? "english" : "日本"));

  if (langButton) {
    setLang(langButton, lang);
  }
});
