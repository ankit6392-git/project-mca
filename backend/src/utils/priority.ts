export const calculatePriority = (count: number) => {
  if (count >= 5) return "HIGH";
  if (count >= 3) return "MEDIUM";
  return "LOW";
};
