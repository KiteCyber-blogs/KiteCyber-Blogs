import fs from "fs";
import path from "path";

const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);

/**
 * Header artwork: public/images/header.png (also jpg, jpeg, webp, svg, gif)
 * or any image placed in public/images/header/.
 * Footer artwork uses the same pattern with "footer".
 */
export function brandImages(slot: "header" | "footer"): string[] {
  const root = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(root)) return [];

  const found: string[] = [];

  for (const name of fs.readdirSync(root)) {
    const ext = path.extname(name).toLowerCase();
    if (path.parse(name).name.toLowerCase() === slot && EXTENSIONS.has(ext)) {
      found.push(`/images/${name}`);
    }
  }

  const folder = path.join(root, slot);
  if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
    for (const name of fs.readdirSync(folder).sort()) {
      if (EXTENSIONS.has(path.extname(name).toLowerCase())) {
        found.push(`/images/${slot}/${encodeURIComponent(name)}`);
      }
    }
  }

  return found;
}
