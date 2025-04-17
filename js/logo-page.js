window.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
  
    setTimeout(() => {
      logo.classList.add("fade-out");
  
      // fade-out이 완료된 후 페이지 이동 (1초 후)
      setTimeout(() => {
        window.location.href = "landing-page.html";
      }, 1000);
    }, 3000);
  });
  