// Build-time QR generation — one static SVG per contractor profile, committed to
// the repo. No runtime service; re-run (via `pnpm run build`) whenever
// src/data/contractors.json changes.
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const contractors = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/contractors.json"), "utf8")
);

const outDir = path.join(root, "public/qr");
fs.mkdirSync(outDir, { recursive: true });

const baseUrl = "https://www.sprayfoamqr.com";

for (const c of contractors) {
  const url = `${baseUrl}/contractors/${c.slug}`;
  const outPath = path.join(outDir, `${c.slug}.svg`);
  await QRCode.toFile(outPath, url, {
    type: "svg",
    margin: 2,
    width: 512,
    color: { dark: "#392118", light: "#F8EDE3" },
  });
}

console.log(`[generate-qr] wrote ${contractors.length} QR code(s) to public/qr/`);
