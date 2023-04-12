function extractDataFromHemnet() {
  const url = window.location.href;
  const title = document.querySelector("h1.listing__heading")?.innerText;
  const price = document.querySelector("span.property-price")?.innerText;
  const address = document.querySelector("p.listing-address")?.innerText;
  const images = Array.from(document.querySelectorAll("img.gallery__image")).map(img => img.src);

  return {
    url,
    title,
    price,
    address,
    images
  };
}

function extractDataFromBooli() {
  const url = window.location.href;
  const title = document.querySelector("h1.annonsrubrik")?.innerText;
  const price = document.querySelector("span.annons-pris")?.innerText;
  const address = document.querySelector("span.annons-adress")?.innerText;
  const images = Array.from(document.querySelectorAll("div.bilder img")).map(img => img.src);

  return {
    url,
    title,
    price,
    address,
    images
  };
}

// Check if the current website is Hemnet
if (window.location.hostname === "www.hemnet.se") {
  const propertyData = extractDataFromHemnet();
  // Send the property data to the background script
  chrome.runtime.sendMessage({
    action: "saveProperty",
    data: propertyData,
  });
}
// Check if the current website is Booli
else if (window.location.hostname === "www.booli.se") {
  const propertyData = extractDataFromBooli();
  // Send the property data to the background script
  chrome.runtime.sendMessage({
    action: "saveProperty",
    data: propertyData,
  });
}
// The current website is not supported
else {
  console.error("Property saver does not support this website");
}

// The background script will handle Firebase initialization and image uploading
