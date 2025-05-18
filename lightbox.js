function openLightbox(element) {
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-image");
    const description = document.getElementById("lightbox-description");

    image.src = element.src;
    image.alt = element.alt || "Client Image";
    description.textContent = element.dataset.description || "";

    lightbox.style.display = "flex";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
}

// Correct outside click logic
document.getElementById("lightbox").addEventListener("click", function (e) {
    // Only close if clicking directly on the background (not on children)
    if (e.target === this) {
        closeLightbox();
    }
});