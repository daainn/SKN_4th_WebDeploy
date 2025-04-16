// script.js

function setLang(button, lang) {
    document.querySelectorAll(".top-bar button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  
    const translations = {
      ko: {
        title: "유물에 말을 걸다, <strong>MUSE</strong>가 답하다.",
        subtitle: "티켓번호를 입력하여 국립중앙박물관의 작품 해설이 담긴 챗봇을 이용해 보세요",
        enterTicket: "티켓 번호를 입력해주세요"
      },
      en: {
        title: "Speak to the Artifact, <strong>MUSE</strong> Responds.",
        subtitle: "Enter your ticket number to access artifact descriptions from the National Museum of Korea.",
        enterTicket: "Please enter your ticket number"
      },
      ja: {
        title: "遺物に話しかけると、<strong>MUSE</strong>が答える。",
        subtitle: "国立中央博物館の解説チャットボットを使うにはチケット番号を入力してください。",
        enterTicket: "チケット番号を入力してください"
      }
    };
  
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  
    const input = document.getElementById("ticketNum");
    if (input && translations[lang].enterTicket) {
      input.placeholder = translations[lang].enterTicket;
    }
  }
  
  function gotoDocent(e) {
    e.preventDefault();
    const ticket = document.getElementById("ticketNum").value.trim();
  
    if (ticket === "" || !ticket.startsWith("#") || ticket.length < 6) {
      document.getElementById("ticketError").style.display = "block";
      return;
    }
  
    window.location.href = "main-page.html";
  }
  