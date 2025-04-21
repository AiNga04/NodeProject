import {
  uploadSingleFile,
  uploadMultipleFiles,
} from "../services/upload.service";

const uploadImage = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded!",
    });
  }

  const result = uploadSingleFile(req.files.image);
  return res.status(200).json(result);
};

const uploadImages = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded!",
    });
  }

  const files = req.files.images;

  if (Array.isArray(files)) {
    // Upload multiple files
    const result = uploadMultipleFiles(files);
    return res.status(200).json(result);
  } else {
    // If only one file is uploaded, treat it as a single file
    const result = uploadSingleFile(files);
    return res.status(200).json(result);
  }
};

export { uploadImage, uploadImages };
