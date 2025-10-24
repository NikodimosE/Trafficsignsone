import { warningSigns } from "./warning-signs.js";
import { getEmbeddedSW } from "./svgParser.js";

const PIXELS_PER_SW = 3;
const DEFAULT_SW = 32;

// 🔧 Render one combo into a grid container
const renderCombo = async ({ codes, caption, group }) => {
  const sectionId = `section-${group ?? "ungrouped"}`;
  const container = document.getElementById(sectionId);
  if (!container) {
    console.warn(`Missing container for ${sectionId}`);
    return;
  }

  const groupDiv = document.createElement("div");
  groupDiv.className = "sign-group";

  const stack = document.createElement("div");
  stack.className = "sign-stack";

  for (const code of codes) {
    const filePath = `../assets/warning/${code}.svg`;
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

  // ✅ This is where you insert the caption with HTML support
  if (caption) {
    const label = document.createElement("p");
    label.className = "sign-caption";
    label.innerHTML = caption; // ← enables embedded HTML like <a>
    groupDiv.appendChild(label);
  }

  container.appendChild(groupDiv);
};

// 🧱 Render all combos in exact array order
(async () => {
  for (const combo of warningSigns) {
    await renderCombo(combo);
  }
})();
