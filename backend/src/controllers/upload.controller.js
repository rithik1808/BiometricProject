import cloudinary from "../utils/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.files?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const originalName = file.originalname;
    const ext = originalName.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
    const resourceType = isImage ? "image" : "raw";

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: "uploads",
          public_id: originalName.split(".")[0],
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    res.json({
      originalName: originalName,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format || ext || "",
      resource_type: result.resource_type,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};
