// Simple fade-in animation on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    const pos = sec.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;
    if (pos < screenPos) sec.classList.add("visible");
  });
});
