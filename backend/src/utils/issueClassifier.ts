/**
 * Lightweight NLP-based issue classifier
 * Used for auto-tagging complaints
 */

const categories: Record<string, string[]> = {
  Road: ["pothole", "road", "street", "bridge", "crack"],
  Water: ["water", "leak", "pipe", "sewage"],
  Electricity: ["electricity", "power", "wire", "transformer"],
  Sanitation: ["toilet", "drain", "sewer", "dirty"],
  Garbage: ["garbage", "waste", "trash", "dump"],
  "Street Light": ["light", "lamp", "pole", "streetlight"],
};

export const classifyIssue = (text: string) => {
  const lower = text.toLowerCase();
  let bestMatch = "Other";
  let maxScore = 0;

  for (const [category, keywords] of Object.entries(categories)) {
    let score = 0;
    keywords.forEach((word) => {
      if (lower.includes(word)) score++;
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = category;
    }
  }

  return {
    category: bestMatch,
    confidence: Math.min(100, maxScore * 30),
  };
};
