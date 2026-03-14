import { RequestHandler } from "express";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
      return;
    }

    callback(new Error("Only image files are allowed"));
  },
});

export const uploadGiftImage: RequestHandler = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        res.status(413).json({ message: "Image too large" });
        return;
      }

      res.status(400).json({ message: error.message });
      return;
    }

    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid image upload",
    });
  });
};
