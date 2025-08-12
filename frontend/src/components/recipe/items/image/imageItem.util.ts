import { useSwal } from "../../../../hooks/useSwal";

const { showError } = useSwal();

export const openImageWithFallback = (imageUrl: string) => {
  const img = new Image();

  img.onload = () => {
    window.open(imageUrl, "_blank");
  };

  img.onerror = () => {
    showError(undefined, "Failed to load image");
  };

  img.src = imageUrl;
};
