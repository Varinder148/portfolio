export const getViewportWidth = () => window.innerWidth;
export const getViewportHeight = () => window.innerHeight;

export const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    //@ts-ignore
    navigator.msMaxTouchPoints > 0
  );
};
