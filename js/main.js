(() => {
  console.log("IIFE Fired");
  // variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  // this is the code for the spinner loading animation

  let spinner = `<svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle></svg>`;

  const materialList = document.querySelector("#material-list");

  // functions

  // Use the Fetch API to load info boxes from the API
  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          // Assuming you have an image element in your HTML with class "info-box-image"
          const imageElement = document.createElement("img");
          // Adjust the image source to include the "images" folder
          imageElement.src = `images/${infoBox.thumbnail}`;
          imageElement.alt = infoBox.heading;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          selected.appendChild(imageElement);
        });
      })
      .catch((error) => console.error("Error fetching info boxes:", error));
  }
  loadInfoBoxes();

  // Use the Fetch API to load material info from the API
  function loadMaterialInfo() {
    // Show the spinner
    materialList.innerHTML = spinner;

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((data) => {
        // Clear the spinner once data is loaded
        materialList.innerHTML = "";

        data.forEach((material) => {
          // make a copy of the template
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          // append the populated template to the ul
          materialList.appendChild(clone);
        });
      })
      .catch((error) => {
        // Handle errors and clear the spinner
        console.error("Error fetching material info:", error);
      });
  }
  loadMaterialInfo();

  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners

  // Check if GSAP is loaded before using it
  if (typeof gsap !== "undefined") {
    model.addEventListener("load", modelLoaded);

    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });

    // Ensure that the DOMContentLoaded event has fired before making API calls
    document.addEventListener("DOMContentLoaded", function () {});
  } else {
    console.error(
      "GSAP library not found. Make sure it is included in your project."
    );
  }
})();
