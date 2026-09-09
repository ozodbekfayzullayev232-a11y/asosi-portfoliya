
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 70
    });
  }

  const track = document.querySelector(".carousel-track");
  const slides = [...document.querySelectorAll(".group-slide")];
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  const dotsWrap = document.querySelector(".carousel-dots");

  if (track && slides.length && prev && next && dotsWrap) {
  let index = 0;
  let timer;

  const visibleCount = () => {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1050) return 2;
    return 3;
  };

  const pageCount = () => Math.max(1, slides.length - visibleCount() + 1);

  function makeDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pageCount(); i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === index ? " active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Rasm ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function render() {
    const count = visibleCount();
    index = Math.min(index, pageCount() - 1);
    const shift = index * (100 / count);
    track.style.transform = `translateX(-${shift}%)`;

    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goTo(i) {
    index = (i + pageCount()) % pageCount();
    render();
    restart();
  }

  function start() {
    timer = setInterval(() => {
      index = (index + 1) % pageCount();
      render();
    }, 4500);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  prev.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));

  window.addEventListener("resize", () => {
    makeDots();
    render();
  });

  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", start);

  makeDots();
  render();
  start();
  }

  // Loyihalar kartasini bosganda loyiha sahifasini ochish
  document.querySelectorAll(".project-card[data-project]").forEach(card => {
    const openProject = () => {
      window.location.href = card.dataset.project;
    };
    card.addEventListener("click", () => openProject());
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject();
      }
    });
  });

});
