/* ================= IMAGE GALLERY LOGIC ================= */
const images = [
  "assets/images/fish-man.jpg"
];

let currentIndex = 0;
const mainImage = document.getElementById("mainImage");
// const thumbnails = document.querySelectorAll(".thumb");

function setImage(index) {
  currentIndex = index;
  mainImage.src = images[index];
  updateActive();
}



/* ================= STICKY HEADER & DROPDOWN LOGIC ================= */
const stickyHeader = document.getElementById("stickyHeader");
const triggerHeading = document.getElementById("triggerHeading");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const heroSection = document.querySelector(".hero");

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll) {
    // scroll UP → hide
    navbar.classList.add("hide");
  } else {
    // scroll DOWN → show
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// Toggle Dropdown menu
if (hamburgerBtn && dropdownMenu) {
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });
}

// Show sticky header only after the user scrolls past the hero heading
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const firstFold = heroSection ? heroSection.offsetHeight : 600; 
  const triggerPoint = triggerHeading ? triggerHeading.offsetTop - 80 : 500;

  if (currentScroll > firstFold) {
    stickyHeader.classList.add("is-visible");
  } else {
    stickyHeader.classList.remove("is-visible");

    // Auto-close dropdown when header hides
    if (hamburgerBtn && hamburgerBtn.classList.contains("active")) {
      hamburgerBtn.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  }
});

/* ================= MODAL LOGIC ================= */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quoteModal");
  const closeBtn = document.getElementById("closeModalBtn");
  
  const quoteButtons = document.querySelectorAll(
    ".dropdown-quote, .hero-content .primary, .quote-btn, .btn-dark"
  );

  if (!modal) return;

  // Open modal on click
  quoteButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
    });
  });

  // Close modal when clicking the 'X'
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Close modal when clicking on the blurred background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
/* ================= FAQ ACCORDION ================= */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach(i => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});


/* ================= INDUSTRY SLIDER ================= */
const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: 320, behavior: "smooth" });
  });
  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -320, behavior: "smooth" });
  });
}


/* ================= TAB SYSTEM ================= */
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const activeTab = document.querySelector(".tab.active");
    if (activeTab) activeTab.classList.remove("active");
    tab.classList.add("active");
  });
});



/* ================= CATALOGUE MODAL LOGIC ================= */
document.addEventListener("DOMContentLoaded", () => {
  const catModal = document.getElementById("catalogueModal");
  const closeCatBtn = document.getElementById("closeCatalogueBtn");
  
  // Selects the "Download Full Technical Datasheet", "Request Catalogue", and PDF download links
  const downloadButtons = document.querySelectorAll(
    ".download-btn, .faq-cta button, .download-row a"
  );

  if (!catModal) return;

  // Open modal on click
  downloadButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      catModal.classList.add("active");
    });
  });

  // Close modal when clicking the 'X'
  if (closeCatBtn) {
    closeCatBtn.addEventListener("click", () => {
      catModal.classList.remove("active");
    });
  }

  // Close modal when clicking on the blurred background
  catModal.addEventListener("click", (e) => {
    if (e.target === catModal) {
      catModal.classList.remove("active");
    }
  });
});

// zoom logic on the hero images 

document.addEventListener("DOMContentLoaded", () => {
  /* ================= 1. STICKY HEADER FOLD LOGIC ================= */
  const header = document.getElementById("stickyHeader");
  const heroSection = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset;
    // REQ: appears beyond first fold (Hero height)
    const firstFoldHeight = heroSection ? heroSection.offsetHeight : 600;

    if (scrollPos > firstFoldHeight) {
      if(header) header.classList.add("is-visible");
    } else {
      if(header) header.classList.remove("is-visible");
    }
  }, { passive: true });

  /* ================= 2. INTERACTIVE ZOOM (Fine-tuned logic) ================= */
  const imageCard    = document.getElementById("imageCard");
  const zoomBox      = document.getElementById("zoomBox");
  const mainImg      = document.getElementById("mainImage");
  const lensHighlight = document.getElementById("lensHighlight");

  if (!imageCard || !zoomBox || !mainImg || !lensHighlight) return;

  const ZOOM_LEVEL = 2.5;  
  const LENS_SIZE  = 120;  // Must match the width/height of .lens-highlight in CSS

  imageCard.addEventListener("mousemove", (e) => {
    const rect = imageCard.getBoundingClientRect();

    // Mouse position relative to the image card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Clamp lens so it stays entirely inside the card borders
    let lensX = mouseX - LENS_SIZE / 2;
    let lensY = mouseY - LENS_SIZE / 2;
    lensX = Math.max(0, Math.min(rect.width  - LENS_SIZE, lensX));
    lensY = Math.max(0, Math.min(rect.height - LENS_SIZE, lensY));

    // Position the lens highlight square
    lensHighlight.style.display = "flex";
    lensHighlight.style.left   = lensX + "px";
    lensHighlight.style.top    = lensY + "px";

    // Show outside zoom box and set the image
    zoomBox.style.display = "block";
    zoomBox.style.backgroundImage = `url(${mainImg.src})`;

    // Calculate background size for the zoom panel
    const zoomW = rect.width  * ZOOM_LEVEL;
    const zoomH = rect.height * ZOOM_LEVEL;
    zoomBox.style.backgroundSize = `${zoomW}px ${zoomH}px`;

    // Calculate precise background position based on the center of the lens
    const cx = (lensX + LENS_SIZE / 2) / rect.width;
    const cy = (lensY + LENS_SIZE / 2) / rect.height;

    const bgX = (cx * zoomW) - (zoomBox.offsetWidth / 2);
    const bgY = (cy * zoomH) - (zoomBox.offsetHeight / 2);

    zoomBox.style.backgroundPosition = `-${bgX}px -${bgY}px`;
  });

  imageCard.addEventListener("mouseleave", () => {
    lensHighlight.style.display = "none";
    zoomBox.style.display       = "none";
  });
});
