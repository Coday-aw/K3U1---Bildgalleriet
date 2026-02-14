// function to filter images by search
export function filterBySearch(query, allImages) {
  const q = query.trim().toLowerCase();
  if (!q) return allImages;

  return allImages.filter((i) => {
    const tags = i.tags || [];
    const tagString = Array.isArray(tags)
      ? tags.join(" ").toLowerCase()
      : String(tags).toLowerCase();

    const category = String(i.category || "").toLowerCase();
    return tagString.includes(q) || category.includes(q);
  });
}

// function to filter images by category
export function filterByCategory(category, allImages) {
  if (!category) return allImages;
  return allImages.filter(
    (i) => i.category && i.category.toLowerCase() === category.toLowerCase()
  );
}

// function to load more images, 12 images at the time
export function getNextBatch(images, index, batch_size = 12) {
  return images.slice(index, index + batch_size);
}

// fetch images from data.json
export async function loadImageData(fetchFn = fetch) {
  const response = await fetchFn("../data.json");
  const data = await response.json();
  return Array.isArray(data.images) ? data.images : [];
}






