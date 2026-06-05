import config from "@/config";

function isImageFile(file) {
  return file && file.type.startsWith("image/");
}

// utils/uploadToImgBB.js
export async function uploadSingleImage(file) {
  if (typeof file === "string") {
    return file;
  }
  if (!isImageFile(file)) {
    return file;
  }
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${config?.imgBBApiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Failed to upload image");
  }

  return data.data.url; // returns direct image URL
}
