
const translations = {
  ko: {
    title: "MUSE",
    subtitle: "국립중앙박물관 챗봇",
    questionPlaceholder: "질문을 입력하세요",
    askButton: "질문하기"
  },
  en: {
    title: "MUSE",
    subtitle: "National Museum Chatbot",
    questionPlaceholder: "Ask your question",
    askButton: "Ask"
  },
  ja: {
    title: "MUSE",
    subtitle: "国立中央博物館 チャットボット",
    questionPlaceholder: "質問を入力してください",
    askButton: "質問する"
  }
};

  function setLang(button, lang) {
    document.querySelectorAll(".language-buttons button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  
    const t = translations[lang];
    if (t) {
      document.querySelector("[data-i18n='title']").innerHTML = t.title;
      document.querySelector("[data-i18n='subtitle']").innerHTML = t.subtitle;
      document.getElementById("userQuestion").placeholder = t.questionPlaceholder;
      document.getElementById("askButton").textContent = t.askButton;

    }
  }
  
  function handleQuestion(event) {
    event.preventDefault();
    const input = document.getElementById('userQuestion');
    const question = input.value.trim();
    if (!question) return;
  
    const chatBox = document.getElementById('chatBox');
  
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = question;
    chatBox.appendChild(userDiv);
  
    const botDiv = document.createElement('div');
    botDiv.className = 'message bot-response';
    botDiv.innerHTML = `
      고려청자는 비색 유약과 상감 기법으로 유명합니다.
      <br>
      <img src="ccc.jpeg" alt="고려청자" class="response-image">
      <audio controls class="response-audio">
        <source src="sample.mp3" type="audio/mpeg">
        오디오 지원 안됨
      </audio>
    `;
    chatBox.appendChild(botDiv);
  
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }