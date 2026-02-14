import { filterBySearch, filterByCategory, loadImageData } from "./logic.js";
import { renderBatch, updateLoadMoreButton, categoryMap, setActiveButton, createModal } from "./dom.js";

const allBtn = document.getElementById("alla");
const natureBtn = document.getElementById("natur");
const animalBtn = document.getElementById("djur");
const sportBtn = document.getElementById("sport");
const konstBtn = document.getElementById("konst");
const searchInput = document.getElementById("searchInput");
const content = document.getElementById("content");
const loadMore = document.getElementById("loadMore");
const dialog = document.getElementById("dialog");

// Array of category buttons for easy management of active states
const categoryButtons = [allBtn, natureBtn, animalBtn, sportBtn, konstBtn];

// State variables to keep track of all images, currently displayed images, and the index for pagination
let allImages = [];
let currentImages = [];
let currentIndex = 0;

// Initializes the gallery by loading all images and setting up the initial state
async function init() {
  allImages = await loadImageData();
  currentImages = allImages;
  setActiveButton(categoryButtons, allBtn);
  loadNext();
}

// Loads the next batch of images and updates the gallery. Also sets up the modal for each image.
function loadNext() {
  const added = renderBatch(currentImages, currentIndex, content, (img) =>
    createModal(dialog, img.url, img.alt)
  );
  currentIndex += added;
  updateLoadMoreButton(loadMore, currentIndex, currentImages.length);
}

// Resets the gallery with a new set of images, used after filtering by category or search
function reset(images) {
  currentImages = images;
  currentIndex = 0;
  content.innerHTML = "";
  loadNext();
}

// Search functionality: filters images as the user types in the search input
searchInput.addEventListener("input", (e) => {
  const filtered = filterBySearch(e.target.value, allImages);
  setActiveButton(categoryButtons, null);
  reset(filtered);
});

categoryButtons.forEach((btn) => {
  // this is for accessibility, it indicates that the button is not pressed by default
  btn.setAttribute("aria-pressed", "false");
  btn.addEventListener("click", () => {
    setActiveButton(categoryButtons, btn);
    // this is for accessibility, it indicates that the button is pressed when active
    btn.setAttribute("aria-pressed", "true");
    const category = categoryMap[btn.id];
    const filtered = filterByCategory(category, allImages);
    reset(filtered);
  });
});

// Load more button to load the next batch of images when clicked
loadMore.addEventListener("click", loadNext);

// Start the application by initializing the gallery
init();
