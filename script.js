document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const progress = document.getElementById("scrollProgress");
  const backTop = document.getElementById("backTop");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const revealItems = [...document.querySelectorAll(".reveal")];

  // Reveal content safely. Everything remains visible even if IntersectionObserver
  // is unavailable, so the page never depends on scrolling/mouse movement to load.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -45px 0px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
      observer.observe(item);
    });

    // Hero is immediately visible.
    document.querySelectorAll("#home .reveal").forEach(el => {
      el.classList.add("is-visible");
    });
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0}%`;

    header.classList.toggle("scrolled", scrollTop > 20);
    backTop.classList.toggle("show", scrollTop > 550);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
