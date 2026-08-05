#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "src/app/icon.svg");
const svg = readFileSync(svgPath);

// apple-icon.png  — square, Apple auto-applies rounded mask + spotlight
await sharp(svg, { density: 384 })
  .flatten({ background: { r: 38, g: 46, b: 27 } }) // moss-900 #262e1b (anti-alpha safety)
  .resize(180, 180, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, quality: 92 })
  .toFile(join(root, "src/app/apple-icon.png"));
console.log("✓ apple-icon.png 180×180");

// 32×32 PNG → fed to Pillow for ICO
// High-res master PNG for Pillow ICO packer (16/32/48 generated in gen-ico.py)
await sharp(svg, { density: 384 })
  .flatten({ background: { r: 38, g: 46, b: 27 } })
  .resize(256, 256, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9 })
  .toFile(join(root, ".favicon-256.png"));
console.log("✓ interim master PNG (256)");