export const generateMAC = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.floor(Math.random() * 256);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
