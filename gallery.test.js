import { jest } from "@jest/globals";
import {
  filterBySearch,
  filterByCategory,
  getNextBatch,
  loadImageData
  
} from "./src/logic.js";

import  { describe, test, expect} from "@jest/globals";



describe("Galleri – logiktester", () => {
  
  // 1. test sökfunktionen, kolla så det retunerar rätt bilder
  test("filterBySearch returnerar korrekt filtrerade bilder", () => {
    const testData = [
      { category: "natur", tags: ["skog", "träd"] },
      { category: "djur", tags: ["katt", "päls"] },
      { category: "sport", tags: ["fotboll"] }
    ];

    const result = filterBySearch("katt", testData);

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("djur");
  });

  test("filterBySearch returnerar inte tom array om matchningar finns", () => {
    const testData = [
      { category: "natur", tags: ["skog"] },
      { category: "djur", tags: ["hund"] }
    ];

    const result = filterBySearch("hund", testData);

    expect(result.length).toBeGreaterThan(0);
  });

  // 2. test kategorifilter, att endast bilder i valt kategori retuneraras

  test("filterByCategory returnerar endast bilder i vald kategori", () => {
    const testData = [
      { category: "natur" },
      { category: "natur" },
      { category: "sport" }
    ];

    const result = filterByCategory("natur", testData);

    expect(result).toHaveLength(2);
    expect(result.every(img => img.category === "natur")).toBe(true);
  });

  test("filterByCategory returnerar alla bilder om kategori är null", () => {
    const testData = [
      { category: "natur" },
      { category: "djur" }
    ];

    const result = filterByCategory(null, testData);

    expect(result).toHaveLength(2);
  });


  // 3. testa att getNextBatch retunerar rätt antal bilder (12)
  test("getNextBatch returnerar korrekt antal bilder", () => {
    const images = Array.from({ length: 30 }, (_, i) => ({ id: i }));

    const batch = getNextBatch(images, 0);

    expect(batch).toHaveLength(12);
  });

  test("getNextBatch returnerar sista batchen korrekt", () => {
    const images = Array.from({ length: 14 }, (_, i) => ({ id: i }));

    const batch = getNextBatch(images, 12);

    expect(batch).toHaveLength(2);
  });

  // 4. testa att json parsars rätt
  test("loadImageData parsar JSON korrekt", async () => {
   const mockData = {images: [{ url: "bild.jpg", alt: "en bild", category: "natur", tags: ["skog"] }]};  
    
   const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData)
    });
    const result = await loadImageData(mockFetch);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("bild.jpg");
  });  
});

