"use client"; // Ensure this is a Client Component

import { put } from "@vercel/blob";
import { useState } from "react";

export function Form() {
  const [message, setMessage] = useState("");

  async function uploadImage(formData: FormData) {
    const imageFile = formData.get("image") as File;
    if (!imageFile) return;

    try {
      await put(imageFile.name, imageFile, {
        access: "public",
      });
      setMessage("Upload successful!");
    } catch (error) {
      setMessage("Upload failed.");
    }
  }

  return (
    <form
      action={(formData) => {
        uploadImage(formData);
      }}
    >
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}
