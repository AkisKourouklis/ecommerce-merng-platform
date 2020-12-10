export const camelize = (text) => {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};
