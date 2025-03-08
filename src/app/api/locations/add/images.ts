import sharp from "sharp";
import { put } from "@vercel/blob";

const FILE_FORMAT = "webp";

export const processAndUploadImage = async (file: Buffer, fileName: string) => {
  try {
    const processedImageBuffer = await sharp(file)
      .resize(1000, 1000, { fit: "cover" })
      .toFormat(FILE_FORMAT)
      .webp({ quality: 80 })
      .toBuffer();

    const blob = await put(`${fileName}.${FILE_FORMAT}`, processedImageBuffer, {
      access: "public",
    });

    return new URL(blob.url).pathname.replace(/^\/+/, "");
  } catch (error) {
    console.error("Image processing error:", error);
    return null;
  }
};
