const images = [
  "assets/images/fish-man.jpg",
  "assets/images/fish-man.jpg",
  "assets/images/fish-man.jpg",
  "assets/images/fish-man.jpg",
  "assets/images/fish-man.jpg"
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");

/* SET IMAGE */
function setImage(index) {
  currentIndex = index;
  mainImage.src = images[index];

  updateActive();
}

/* NEXT */
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  setImage(currentIndex);
}

/* PREVIOUS */
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  setImage(currentIndex);
}

/* ACTIVE THUMB */
function updateActive() {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.remove("active");
    if (i === currentIndex) {
      thumb.classList.add("active");
    }
  });
}


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

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.addEventListener("click", () => {
    faqItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});



const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 320, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -320, behavior: "smooth" });
});


const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");

  
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const imageCard = document.getElementById("imageCard");
  const zoomBox = document.getElementById("zoomBox");
  const mainImg = document.getElementById("mainImage");

  const zoomLevel = 3; 

  imageCard.addEventListener("mousemove", (e) => {
    zoomBox.style.display = "block";

    const rect = imageCard.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    zoomBox.style.backgroundImage = `url(${mainImg.src})`;
    zoomBox.style.backgroundSize = `${zoomLevel * 100}%`;

    zoomBox.style.backgroundPosition = `
      ${xPercent * 100}% ${yPercent * 100}%
    `;
  });

  imageCard.addEventListener("mouseleave", () => {
    zoomBox.style.display = "none";
  });

});