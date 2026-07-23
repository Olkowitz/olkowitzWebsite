// Jednoduchý lightbox pro fotogalerii (bez knihoven, využívá nativní <dialog>)

document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("lightbox");
  if (!dialog) return;

  const dialogImg = dialog.querySelector(".lightbox-img");
  const closeBtn = dialog.querySelector(".lightbox-close");
  const images = document.querySelectorAll(".gallery-item img");

  function openLightbox(img) {
    // data-full umožňuje zobrazit verzi ve vyšším rozlišení, jinak se použije zobrazený obrázek
    dialogImg.src = img.dataset.full || img.src;
    dialogImg.alt = img.alt;
    dialog.showModal();
  }

  images.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener("click", () => dialog.close());

  // Zavření kliknutím mimo obrázek (na tmavé pozadí)
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Uvolnění obrázku po zavření
  dialog.addEventListener("close", () => {
    dialogImg.removeAttribute("src");
  });
});

