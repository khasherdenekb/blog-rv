import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
    maxFieldsSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse form data",
        error: err.message,
      });
    }

    const file = files.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    try {
      const result = await cloudinary.uploader.upload(file?.[0]?.filepath, {
        resource_type: "image",
        folder: "blogrv",
      });

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error.message,
      });
    }
  });
};
