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


window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang") || localStorage.getItem("selectedLang") || "ko";

  localStorage.setItem("selectedLang", lang);

  const langButton = Array.from(document.querySelectorAll(".top-bar button"))
    .find(btn => btn.textContent.toLowerCase().includes(lang === "ko" ? "한국" : lang === "en" ? "english" : "日本"));

  if (langButton) {
    setLang(langButton, lang);
  }
});
