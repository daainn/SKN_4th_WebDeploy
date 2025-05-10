function applyLanguage(lang) {
    const langMap = {
      ko: { selector: ".lang-ko, .row-1", index: 0 },
      en: { selector: ".lang-en, .row-2", index: 1 },
      ja: { selector: ".lang-ja, .row-3", index: 2 }
    };
    const current = langMap[lang] || langMap["ko"];
  
    document.querySelectorAll(".lang-ko, .lang-en, .lang-ja, .row-1, .row-2, .row-3").forEach(el => {
      el.style.display = "none";
    });
  
    document.querySelectorAll(current.selector).forEach(el => {
      const isFlex = el.closest('.layout-row') || el.classList.contains('row-1') || el.classList.contains('row-2') || el.classList.contains('row-3');
      el.style.display = isFlex ? "flex" : "block";
    });
  
    document.querySelectorAll(".top-bar button, .language-buttons button").forEach(btn => {
      btn.classList.remove("active");
    });
    const buttons = document.querySelectorAll(".top-bar button, .language-buttons button");
    if (buttons[current.index]) {
      buttons[current.index].classList.add("active");
    }
  
    if (document.getElementById("chatSubtitle")) {
      const subtitleText = {
        ko: "국립중앙박물관 챗봇",
        en: "National Museum of Korea Chatbot",
        ja: "国立中央博物館チャットボット"
      };
      document.getElementById("chatSubtitle").innerText = subtitleText[lang] || subtitleText["ko"];
    }
  
    if (document.getElementById("userQuestion")) {
      const placeholderText = {
        ko: "무엇이 궁금하세요?",
        en: "What would you like to ask?",
        ja: "何が知りたいですか？"
      };
      document.getElementById("userQuestion").placeholder = placeholderText[lang] || placeholderText["ko"];
    }
  
    if (document.getElementById("copyright")) {
      const copyrightText = {
        ko: "©copyright 본 이미지와 자료는 국립중앙박물관으로부터 제공 받았습니다.",
        en: "©copyright Images and content provided by the National Museum of Korea.",
        ja: "©copyright 画像および資料は国立中央博物館から提供されたものです。"
      };
      document.getElementById("copyright").innerText = copyrightText[lang] || copyrightText["ko"];
    }
  }
  
  function setLang(button, lang) {
    localStorage.setItem("selectedLang", lang);
    applyLanguage(lang);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("selectedLang") || "ko";
    applyLanguage(lang);
  });
  
