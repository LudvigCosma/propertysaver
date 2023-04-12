const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "propertysaver",
  keyFilename: "/propertysaver-1237f1d1ac1b.json",
});

const bucket = storage.bucket("property-image-saver");

async function uploadImageToGoogleCloudStorage(imageUrl) {
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.buffer();
  const imageName = `property-images/${Date.now()}-${imageUrl.split('/').pop()}`;
  const file = bucket.file(imageName);

  await file.save(imageBuffer, {
    contentType: imageResponse.headers.get("content-type"),
    public: true,
  });

  return file.publicUrl();
}

module.exports = { uploadImageToGoogleCloudStorage };


