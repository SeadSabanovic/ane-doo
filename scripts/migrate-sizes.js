/**
 * Jednokratno: kreira dokumente `size` za stare preset vrijednosti i
 * migrira proizvode sa `sizes: string[]` + `customSizes` na `sizes: reference[]`.
 *
 * Zahtijeva: SANITY_API_WRITE_TOKEN (Editor) u .env.local
 * Pokretanje: node scripts/migrate-sizes.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });

const { createClient } = require("@sanity/client");

const PRESETS = [
  { title: "XS", value: "xs" },
  { title: "S", value: "s" },
  { title: "M", value: "m" },
  { title: "L", value: "l" },
  { title: "XL", value: "xl" },
  { title: "XXL", value: "xxl" },
  { title: "XXXL", value: "xxxl" },
  { title: "90 × 200 cm", value: "posteljina_90x200" },
  { title: "140 × 200 cm", value: "posteljina_140x200" },
  { title: "160 × 200 cm", value: "posteljina_160x200" },
  { title: "180 × 200 cm", value: "posteljina_180x200" },
  { title: "200 × 200 cm", value: "posteljina_200x200" },
  { title: "140 × 220 cm", value: "posteljina_140x220" },
  { title: "160 × 220 cm", value: "posteljina_160x220" },
];

function slugifyCustom(label) {
  const s = String(label)
    .trim()
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s ? `custom-${s}` : `custom-${Date.now()}`;
}

function refItem(ref) {
  return {
    _type: "reference",
    _ref: ref,
    _key: `k-${ref.slice(-8)}-${Math.random().toString(36).slice(2, 9)}`,
  };
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET");
    process.exit(1);
  }
  if (!token) {
    console.error("Set SANITY_API_WRITE_TOKEN in .env.local (token with write access).");
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  console.log("Seeding preset sizes…");
  const presetIdBySlug = new Map();
  for (let i = 0; i < PRESETS.length; i++) {
    const { title, value } = PRESETS[i];
    const existing = await client.fetch(`*[_type == "size" && slug.current == $slug][0]._id`, {
      slug: value,
    });
    if (existing) {
      presetIdBySlug.set(value, existing);
      continue;
    }
    const doc = await client.create({
      _type: "size",
      name: title,
      slug: { _type: "slug", current: value },
      order: i,
    });
    presetIdBySlug.set(value, doc._id);
    console.log("  created size", value, doc._id);
  }

  async function ensureCustomSize(label) {
    const slug = slugifyCustom(label);
    const existing = await client.fetch(`*[_type == "size" && slug.current == $slug][0]._id`, {
      slug,
    });
    if (existing) return existing;
    const doc = await client.create({
      _type: "size",
      name: String(label).trim(),
      slug: { _type: "slug", current: slug },
      order: 1000,
    });
    console.log("  created custom size", slug, doc._id);
    return doc._id;
  }

  console.log("Migrating products…");
  const products = await client.fetch(`*[_type == "product"]{_id, sizes, customSizes}`);

  for (const p of products) {
    const sizes = p.sizes;
    const customSizes = p.customSizes;

    const hasLegacyStrings =
      Array.isArray(sizes) && sizes.length > 0 && typeof sizes[0] === "string";
    const hasLegacyCustom =
      Array.isArray(customSizes) && customSizes.some((x) => typeof x === "string");

    if (!hasLegacyStrings && !hasLegacyCustom) {
      if (Array.isArray(customSizes) && customSizes.length > 0) {
        await client.patch(p._id).unset("customSizes").commit();
        console.log("  cleared orphan customSizes", p._id);
      }
      continue;
    }

    const refSet = new Set();
    const refs = [];

    if (hasLegacyStrings) {
      for (const s of sizes) {
        if (typeof s !== "string") continue;
        const id = presetIdBySlug.get(s);
        if (!id) {
          console.warn("  unknown preset slug, skipping:", s, p._id);
          continue;
        }
        if (!refSet.has(id)) {
          refSet.add(id);
          refs.push(refItem(id));
        }
      }
    }

    if (hasLegacyCustom) {
      for (const label of customSizes) {
        if (typeof label !== "string" || !label.trim()) continue;
        const id = await ensureCustomSize(label);
        if (!refSet.has(id)) {
          refSet.add(id);
          refs.push(refItem(id));
        }
      }
    }

    await client.patch(p._id).set({ sizes: refs }).unset("customSizes").commit();
    console.log("  migrated product", p._id, refs.length, "refs");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
