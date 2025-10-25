import { getEmbeddedSW } from "./svgParser.js";

const PIXELS_PER_SW = 3;
const DEFAULT_SW = 32;

// 🔍 Detect sign list from global scope
const signListEntry = Object.entries(globalThis).find(([key, value]) =>
  key.endsWith("Signs") && Array.isArray(value)
);

if (!signListEntry) {
  console.warn("No sign list found (e.g. warningSigns, regulatorySigns)");
} else {
  const [key, signArray] = signListEntry;
  const folder = key.replace("Signs", "").toLowerCase();
  renderSigns(signArray, folder);
}

// 🚦 Main renderer
export async function renderSigns(signArray, folder) {
  for (const combo of signArray) {
    const sectionId = `section-${combo.group ?? "ungrouped"}`;
    const container = document.getElementById(sectionId);
    if (!container) {
      console.warn(`Missing container for ${sectionId}`);
      continue;
    }

    const groupDiv = document.createElement("div");
    groupDiv.className = "sign-group";

    const stack = document.createElement("div");
    stack.className = "sign-stack";

    for (const code of combo.codes) {
      const filePath = `../assets/${folder}/${code}.svg`;
      const sw = await getEmbeddedSW(filePath) ?? DEFAULT_SW;
      const height = sw * PIXELS_PER_SW;

      const img = document.createElement("img");
      img.src = filePath;
      img.alt = `Sign ${code}`;
      img.style.height = `${height}px`;
      img.onerror = () => console.warn(`Missing sign: ${code}.svg`);

      stack.appendChild(img);
    }

    groupDiv.appendChild(stack);

    if (combo.caption) {
      const label = document.createElement("p");
      label.className = "sign-caption";
      label.innerHTML = combo.caption;
      groupDiv.appendChild(label);
    }

    container.appendChild(groupDiv);
  }
}
