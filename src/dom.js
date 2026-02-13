import { getNextBatch} from "./data.js";

// create next batch of images and create an image element
export function renderBatch(images, index, content, onClick) {
  const batch = getNextBatch(images, index);

  batch.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.alt || "";
    img.loading = "lazy";
    img.addEventListener("click", () => onClick(image));
    content.appendChild(img);
  });

  return batch.length;
}

// function to hide load more button when where are no more images
export function updateLoadMoreButton(loadMoreBtn, currentIndex, total) {
  loadMoreBtn.style.display = currentIndex >= total ? "none" : "block";
}

// create modal when image is clicked with a bigger version of the images
export function createModal(dialog, url, alt) {
  dialog.show();
  dialog.innerHTML = `
    <img class="img" src="${url}" alt="${alt}" loading="lazy" />
    <button class="close-btn">X</button>
  `;
  const closeBtn = document.querySelector(".close-btn")
  closeBtn.addEventListener("click", () => {
  dialog.close();
  });
}

// categories for the buttons
export const categoryMap = {
  alla: null,
  natur: "natur",
  djur: "djur",
  sport: "sport",
  konst: "konst",
};

// function to style the active buttonß
export function setActiveButton(buttons, active) {
  buttons.forEach((b) => b.classList.remove("active"));
  if (active) active.classList.add("active");
}

