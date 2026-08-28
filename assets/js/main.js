(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && nav) {
    const menuLabel = menuToggle.querySelector(".sr-only");

    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (menuLabel) menuLabel.textContent = "Menü öffnen";
    };

    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      if (menuLabel) menuLabel.textContent = open ? "Menü öffnen" : "Menü schließen";
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  const reveals = document.querySelectorAll(".reveal");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    reveals.forEach((element) => observer.observe(element));
  }

  const stage = document.querySelector("[data-parallax-stage]");

  if (stage && !reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--pointer-x", `${(x * 10).toFixed(2)}px`);
      stage.style.setProperty("--pointer-y", `${(y * 10).toFixed(2)}px`);
      stage.style.setProperty("--pointer-phone-x", `${(x * 7).toFixed(2)}px`);
      stage.style.setProperty("--pointer-phone-y", `${(y * 7).toFixed(2)}px`);
      stage.style.setProperty("--pointer-float-x", `${(x * 15).toFixed(2)}px`);
      stage.style.setProperty("--pointer-float-y", `${(y * 15).toFixed(2)}px`);
      stage.style.setProperty("--pointer-far-x", `${(x * 18).toFixed(2)}px`);
      stage.style.setProperty("--pointer-far-y", `${(y * 18).toFixed(2)}px`);
    });

    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--pointer-x", "0px");
      stage.style.setProperty("--pointer-y", "0px");
      stage.style.setProperty("--pointer-phone-x", "0px");
      stage.style.setProperty("--pointer-phone-y", "0px");
      stage.style.setProperty("--pointer-float-x", "0px");
      stage.style.setProperty("--pointer-float-y", "0px");
      stage.style.setProperty("--pointer-far-x", "0px");
      stage.style.setProperty("--pointer-far-y", "0px");
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
