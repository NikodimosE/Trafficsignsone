// scripts/svgParser.js
export async function getEmbeddedSW(filePath) {
  try {
    const response = await fetch(filePath);
    const svgText = await response.text();

    const matches = [...svgText.matchAll(/<text[^>]*>(.*?)<\/text>/gi)];
    for (const match of matches) {
      const content = match[1];
      const swMatch = content.match(/sw\s*=\s*(\d+(\.\d+)?)/i);
      if (swMatch) return parseFloat(swMatch[1]);
    }

    return null;
  } catch (err) {
    console.warn(`Failed to parse SW from ${filePath}:`, err);
    return null;
  }
}
