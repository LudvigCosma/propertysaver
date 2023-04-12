import { saveProperty } from "./background.js";

// popup.js
document.getElementById("saveProperty").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "saveProperty" });
  });
});
