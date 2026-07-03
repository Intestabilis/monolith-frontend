import defaultThumbnail from "../assets/default-cover-thumb.webp";

export function getCloudinaryThumb(
  url: string | null | undefined,
  width?: number,
  height?: number,
): string {
  // CHANGE default thumbnail image to something generic
  if (!url) return defaultThumbnail;

  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/w_${width ? width : "400"},h_${height ? height : 225},c_fill,f_webp,q_auto/`,
    );
  }

  return url;
}
