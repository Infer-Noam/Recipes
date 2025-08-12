export const openImageWithFallback = (imageUrl: string) => {
  const img = new Image();

  img.onload = () => {
    window.open(imageUrl, "_blank");
  };

  img.onerror = () => {
    window.open("https://www.bing.com/images/search?q=recipe", "_blank");
  };

  img.src = imageUrl;
};
