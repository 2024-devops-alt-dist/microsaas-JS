import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { uploadsDirectory } from "../config/uploads";

const giftsUploadsDirectory = path.join(uploadsDirectory, "gifts");
const giftsPublicPrefix = "/uploads/gifts";

export async function storeGiftImage(file: Express.Multer.File) {
  await fs.mkdir(giftsUploadsDirectory, { recursive: true });

  const filename = `${randomUUID()}.webp`;
  const outputPath = path.join(giftsUploadsDirectory, filename);

  await sharp(file.buffer)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 78 })
    .toFile(outputPath);

  return `${giftsPublicPrefix}/${filename}`;
}

export async function deleteStoredGiftImage(imageUrl: string) {
  if (!imageUrl.startsWith(`${giftsPublicPrefix}/`)) {
    return;
  }

  const filename = path.basename(imageUrl);
  const filePath = path.join(giftsUploadsDirectory, filename);
  await fs.rm(filePath, { force: true });
}
