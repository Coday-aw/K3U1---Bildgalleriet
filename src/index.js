import { filterBySearch, filterByCategory, loadImageData } from "./logic.js";

import { renderBatch, updateLoadMoreButton, categoryMap, setActiveButton, createModal } from "./dom.js";

// DOM-referenser (RÄTT plats!)
const allBtn = document.getElementById("alla");
const natureBtn = document.getElementById("natur");
const animalBtn = document.getElementById("djur");
const sportBtn = document.getElementById("sport");
const konstBtn = document.getElementById("konst");
const searchInput = document.getElementById("searchInput");
const content = document.getElementById("content");
const loadMore = document.getElementById("loadMore");
const dialog = document.getElementById("dialog");

const categoryButtons = [allBtn, natureBtn, animalBtn, sportBtn, konstBtn];

let allImages = [];
let currentImages = [];
let currentIndex = 0;

async function init() {
  allImages = await loadImageData();
  currentImages = allImages;
  setActiveButton(categoryButtons, allBtn);
  loadNext();
}

function loadNext() {
  const added = renderBatch(currentImages, currentIndex, content, (img) =>
    createModal(dialog, img.url, img.alt)
  );
  currentIndex += added;
  updateLoadMoreButton(loadMore, currentIndex, currentImages.length);
}

function reset(images) {
  currentImages = images;
  currentIndex = 0;
  content.innerHTML = "";
  loadNext();
}

// Events
searchInput.addEventListener("input", (e) => {
  const filtered = filterBySearch(e.target.value, allImages);
  setActiveButton(categoryButtons, null);
  reset(filtered);
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveButton(categoryButtons, btn);
    const category = categoryMap[btn.id];
    const filtered = filterByCategory(category, allImages);
    reset(filtered);
  });
});

loadMore.addEventListener("click", loadNext);

init();
