const express = require("express");
const cors = require("cors");
const { uploadImageToGoogleCloudStorage } = require("./upload");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", async (req, res) => {
  const imageUrl = req.body.imageUrl;
  try {
    const uploadedImageUrl = await uploadImageToGoogleCloudStorage(imageUrl);
    res.json({ imageUrl: uploadedImageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
