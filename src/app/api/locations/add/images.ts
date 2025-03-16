import { put } from "@vercel/blob";
import sharp from "sharp";

const FILE_FORMAT = "avif";

export const processAndUploadImage = async (file: Buffer, fileName: string) => {
  try {
    const processedImageBuffer = await sharp(file)
      .resize(1000, 1000, { fit: "cover" })
      .toFormat(FILE_FORMAT)
      .avif({ effort: 9, quality: 30 })
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
