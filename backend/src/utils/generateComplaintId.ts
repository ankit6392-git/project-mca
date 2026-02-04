export const generateComplaintId = (count: number) => {
  const year = new Date().getFullYear();
  return `CC-${year}-${String(count).padStart(6, "0")}`;
};
