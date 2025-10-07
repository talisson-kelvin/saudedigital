window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  // Espera o fim da animação
  setTimeout(() => {
    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";
    
    setTimeout(() => {
      intro.remove();
      document.body.classList.add("loaded");
      document.body.style.overflow = "auto"; // libera scroll
    }, 1000);
  }, 4800); // tempo total da intro
});
