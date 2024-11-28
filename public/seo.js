document.addEventListener("DOMContentLoaded", () => {
  if (typeof seoJson === "undefined" || !seoJson) {
    console.error("SEO JSON path not specified.");
    return;
  }
  fetch(seoJson)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.title = data.title;
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = data.description;
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = data.tags;
    })
    .catch((error) => {
      console.error("Error loading the SEO details:", error);
    });
});
