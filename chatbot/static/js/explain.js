function gotoDocent() {
  const lang = localStorage.getItem("selectedLang") || "ko";
  window.location.href = `chatbot-page.html?lang=${lang}`;
}


function setLang(button, lang) {
  localStorage.setItem("selectedLang", lang);

  document.querySelectorAll(".top-bar button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  document.querySelectorAll(".slide-text").forEach(div => {
    div.classList.remove("lang-visible-flex", "lang-visible-block");
    div.classList.add("lang-hidden");
  });

  document.querySelectorAll(".lang-" + lang).forEach(div => {
    div.classList.remove("lang-hidden");
    if (div.classList.contains("how-section3")) {
      div.classList.add("lang-visible-flex");
    } else {
      div.classList.add("lang-visible-block");
    }
  });

  const enterBtn = document.querySelector(".enter-btn");
  if (enterBtn) {
    if (lang === "ko") enterBtn.textContent = "입장하기";
    else if (lang === "en") enterBtn.textContent = "Enter";
    else if (lang === "ja") enterBtn.textContent = "入場する";
  }
}

// 슬라이드 휠 스크롤 적용
const wrapper = document.querySelector('.horizontal-scroll-wrapper');
if (wrapper) {
  wrapper.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      wrapper.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  }, { passive: false });
}

// 인디케이터 업데이트 함수
function updateIndicator() {
  const wrapper = document.querySelector('.horizontal-scroll-wrapper');
  const dots = document.querySelectorAll('.slide-indicator .dot');
  const slides = document.querySelectorAll('.slide');
  const enterBtnWrapper = document.querySelector('.enter-btn-wrapper');

  let scrollLeft = wrapper.scrollLeft;
  let slideWidth = slides[0].offsetWidth + 32; // gap 2rem = 32px
  let index = Math.round(scrollLeft / slideWidth);

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index]?.classList.add('active');

  // 마지막 슬라이드 도달 시만 버튼 표시
  if (index === dots.length - 1) {
      enterBtnWrapper.style.display = 'block';
  } else {
      enterBtnWrapper.style.display = 'none';
  }
}



// 스크롤에 따라 인디케이터 갱신
document.querySelector('.horizontal-scroll-wrapper')?.addEventListener('scroll', updateIndicator);

// dot 클릭 시 해당 슬라이드로 이동
  document.querySelectorAll('.slide-indicator .dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    const slideWidth = document.querySelector('.slide')?.offsetWidth || 0;
    const gap = 32; // gap: 2rem (기존 flex gap)
    const scrollPosition = index * (slideWidth + gap);
    
    wrapper.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
});


window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem("selectedLang") || "ko";

  // 버튼을 찾아서 setLang에 전달 (버튼 없을 수도 있으니 확인)
  const langButton = Array.from(document.querySelectorAll(".top-bar button"))
    .find(btn => btn.textContent.toLowerCase().includes(savedLang === "ko" ? "한국" : savedLang === "en" ? "english" : "日本"));

  if (langButton) {
    setLang(langButton, savedLang);
  }
});