import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhO3sNBqc0l4DSok5D8awSesDqL5QxZIk",
  authDomain: "propertysaver.firebaseapp.com",
  projectId: "propertysaver",
  storageBucket: "propertysaver.appspot.com",
  messagingSenderId: "701588671910",
  appId: "1:701588671910:web:cb00f60ef5b44c48ac9367",
  measurementId: "G-DPFHNP9P8J"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function saveProperty(propertyData) {
  // Upload images to Firebase Storage
  propertyData.images.forEach(uploadImage);

  // Save property data to Firebase Firestore
  // (Replace this code with your own implementation)
  console.log("Saving property data:", propertyData);
}

async function uploadImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storageRef = ref(storage, `${Date.now()}.jpg`);
    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);
    console.log(`Image uploaded: ${url}`);

  } catch (error) {
    console.error('Failed to upload image:', error);
  }
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "saveProperty") {
    saveProperty(message.data);
  }
});
