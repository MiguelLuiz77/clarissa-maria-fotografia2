const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const galleryModal = document.querySelector("#gallery-modal");
const galleryTitle = document.querySelector("#gallery-title");
const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryCounter = document.querySelector("#gallery-counter");
const galleryThumbs = document.querySelector("#gallery-thumbs");
const galleryClose = document.querySelector(".gallery-close");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

const galleryTitles = {
  casal: "Ensaio de casal",
  casamento: "Casamento",
  gestante: "Ensaio de gestante",
  smash: "Smash the cake",
  individual: "Ensaios individuais",
  newborn: "Ensaio newborn",
  familia: "Ensaio de família",
  formandos: "Ensaio de formandos",
};

const galleryFiles = {
  casal: ["ensaio-casal-novo.jpg", "casal-02.jpg", "casal-03.jpg", "casal-04.jpg"],
  casamento: ["casamento.jpg", "casamento-02.jpg", "casamento-03.jpg", "casamento-04.jpg"],
  gestante: ["ensaio-gestante.jpg", "gestante-02.jpg", "gestante-03.jpg", "gestante-04.jpg"],
  smash: ["smash-the-cake.jpg", "smash-the-cake-02.jpg", "smash-the-cake-03.jpg", "smash-the-cake-04.jpg", "smash-the-cake-05.jpg"],
  individual: ["ensaios-individuais.jpg", "individual-02.jpg", "individual-03.jpg", "individual-04.jpg"],
  newborn: ["ensaio-newborn.jpg", "newborn-02.jpg", "newborn-03.jpg", "newborn-04.jpg"],
  familia: ["ensaio-familia.jpg", "familia-02.jpg", "familia-03.jpg", "familia-04.jpg"],
  formandos: ["ensaio-formandos.jpg", "formandos-02.jpg", "formandos-03.jpg", "formandos-04.jpg"],
};

const galleries = Object.fromEntries(
  Object.entries(galleryFiles).map(([key, files]) => [
    key,
    files.map((src, index) => ({
      src,
      alt: `${galleryTitles[key]}, foto ${index + 1}`,
      caption: `${galleryTitles[key]} · imagem ${index + 1}`,
    })),
  ]),
);

let activeGallery = null;
let activeIndex = 0;
let previousFocus = null;

const renderGalleryThumbs = () => {
  if (!galleryThumbs || !activeGallery) return;

  galleryThumbs.replaceChildren();
  galleries[activeGallery].forEach((item, index) => {
    const thumb = document.createElement("button");
    thumb.className = "gallery-thumb";
    thumb.type = "button";
    thumb.setAttribute("aria-label", `Abrir imagem ${index + 1}`);
    thumb.setAttribute("aria-current", String(index === activeIndex));

    const image = document.createElement("img");
    image.src = `assets/${item.src}`;
    image.alt = "";
    image.loading = "lazy";
    thumb.append(image);
    thumb.addEventListener("click", () => {
      activeIndex = index;
      updateGallery();
    });
    galleryThumbs.append(thumb);
  });
};

const updateGallery = () => {
  if (!activeGallery || !galleries[activeGallery]) return;
  const items = galleries[activeGallery];
  const item = items[activeIndex];

  galleryTitle.textContent = galleryTitles[activeGallery];
  galleryImage.src = `assets/${item.src}`;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = item.caption;
  galleryCounter.textContent = `${activeIndex + 1} / ${items.length}`;

  galleryThumbs.querySelectorAll(".gallery-thumb").forEach((thumb, index) => {
    thumb.setAttribute("aria-current", String(index === activeIndex));
  });
};

const openGallery = (key, trigger) => {
  if (!galleryModal || !galleries[key]) return;

  activeGallery = key;
  activeIndex = 0;
  previousFocus = trigger || document.activeElement;
  renderGalleryThumbs();
  updateGallery();
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("gallery-open");
  galleryClose?.focus();
};

const closeGallery = () => {
  if (!galleryModal?.classList.contains("is-open")) return;

  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-open");
  previousFocus?.focus?.();
  activeGallery = null;
};

document.querySelectorAll("[data-gallery]").forEach((trigger) => {
  trigger.addEventListener("click", () => openGallery(trigger.dataset.gallery, trigger));
});

document.querySelectorAll("[data-gallery-close]").forEach((element) => {
  element.addEventListener("click", closeGallery);
});

galleryPrev?.addEventListener("click", () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex - 1 + galleries[activeGallery].length) % galleries[activeGallery].length;
  updateGallery();
});

galleryNext?.addEventListener("click", () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex + 1) % galleries[activeGallery].length;
  updateGallery();
});

document.addEventListener("keydown", (event) => {
  if (!galleryModal?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    galleryPrev?.click();
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    galleryNext?.click();
  }

  if (event.key === "Tab") {
    const focusable = galleryModal.querySelectorAll("button:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
