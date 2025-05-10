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
const wrapper = document.querySelector('.horizontal-scroll-wrapper');
if (wrapper) {
  wrapper.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      wrapper.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  }, { passive: false });
}
function updateIndicator() {
  const wrapper = document.querySelector('.horizontal-scroll-wrapper');
  const dots = document.querySelectorAll('.slide-indicator .dot');
  const slides = document.querySelectorAll('.slide');
  const enterBtnWrapper = document.querySelector('.enter-btn-wrapper');

  let scrollLeft = wrapper.scrollLeft;
  let slideWidth = slides[0].offsetWidth + 32; 
  let index = Math.round(scrollLeft / slideWidth);

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index]?.classList.add('active');

  if (index === dots.length - 1) {
      enterBtnWrapper.style.display = 'block';
  } else {
      enterBtnWrapper.style.display = 'none';
  }
}


document.querySelector('.horizontal-scroll-wrapper')?.addEventListener('scroll', updateIndicator);

  document.querySelectorAll('.slide-indicator .dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    const slideWidth = document.querySelector('.slide')?.offsetWidth || 0;
    const gap = 32; 
    const scrollPosition = index * (slideWidth + gap);
    
    wrapper.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
});


window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem("selectedLang") || "ko";

  const langButton = Array.from(document.querySelectorAll(".top-bar button"))
    .find(btn => btn.textContent.toLowerCase().includes(savedLang === "ko" ? "한국" : savedLang === "en" ? "english" : "日本"));

  if (langButton) {
    setLang(langButton, savedLang);
  }
});
