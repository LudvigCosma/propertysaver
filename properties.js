document.getElementById("saveButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "saveProperty" });
  });
});

function displayProperties(properties) {
  const propertiesContainer = document.getElementById("properties");

  properties.forEach((property) => {
    const propertyDiv = document.createElement("div");
    propertyDiv.className = "property";

    const title = document.createElement("h2");
    title.innerText = property.title;
    propertyDiv.appendChild(title);

    const address = document.createElement("p");
    address.innerText = property.address;
    propertyDiv.appendChild(address);

    const price = document.createElement("p");
    price.innerText = property.price;
    propertyDiv.appendChild(price);

    property.images.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      propertyDiv.appendChild(img);
    });

    propertiesContainer.appendChild(propertyDiv);
  });
}

chrome.storage.local.get("properties", (result) => {
  const properties = result.properties || [];
  displayProperties(properties);
});
