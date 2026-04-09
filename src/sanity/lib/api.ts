import { client } from "./client";

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  sku: string;
  description: string;
  salePrice?: number;
  /** Maloprodajna referentna cijena (kad je akcija; veća od veleprodajne) */
  retailPrice?: number;
  /** Opcionalno ako je samo maloprodaja ili je jedinična cijena samo iz „po paketu”. */
  wholesalePrice?: number;
  /** Cijena za cijeli veleprodajni paket (sinhronizuje se s cijenom po komadu × komada u paketu). */
  wholesalePricePerPackage?: number;
  /** Obavezno kad postoji bilo koja veleprodajna cijena; za samo maloprodaju može ostati prazno u CMS-u. */
  wholesaleMinQuantity?: number;
  /** Slobodan tekst opisa sadržaja paketa (CMS textarea) */
  packageContentsText?: string;
  images: {
    asset: {
      _ref: string;
    };
    alt?: string;
  }[];
  category: {
    _ref: string;
    name: string;
    slug: {
      current: string;
    };
    parent?: {
      name: string;
      slug: {
        current: string;
      };
    };
  };
  /** Veličine iz kataloga; `null` u nizu kad referenca nije razriješena (obrisan `size` ili pokvaren ref). */
  sizes?: (
    | {
        _id: string;
        name: string;
        slug: { current: string };
      }
    | null
  )[] | null;
  /** Boje iz kataloga; `null` u nizu kad referenca nije razriješena. */
  colors?: (
    | {
        _id: string;
        name: string;
        hex: string;
        slug: { current: string };
      }
    | null
  )[] | null;
  inStock: boolean;
  featured: boolean;
  tags?: string[];
  material?: string;
  weight?: string;
  originCountry?: string;
  specifications?: {
    label: string;
    value?: string;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  isParent: boolean;
  parent?: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  };
  icon?: string;
  order?: number;
  subcategories?: Category[];
}

/**
 * Shop listing sort. `popular` = istaknuti (`featured`) prvo, zatim naziv — nema
 * podataka o prodaji/pregledima u Sanityju, pa nije „prava” popularnost.
 */
export type ShopSort = "popular" | "newest" | "price-asc" | "price-desc";

export function parseShopSortParam(
  value: string | null | undefined,
): ShopSort {
  if (
    value === "newest" ||
    value === "price-asc" ||
    value === "price-desc" ||
    value === "popular"
  ) {
    return value;
  }
  return "popular";
}

/** Minimalna duljina pretrage (nakon trimiranja) za Sanity upit i URL param `q`. */
export const SHOP_SEARCH_MIN_LENGTH = 3;

export function parseShopSearchQuery(
  value: string | null | undefined,
): string | null {
  const t = (value ?? "").trim();
  if (t.length < SHOP_SEARCH_MIN_LENGTH) return null;
  return t;
}

/**
 * Jedna „komadna” cijena za GROQ filter i sort u shopu (akcija → veleprodaja → iz paketa → maloprodaja).
 */
const GROQ_SHOP_UNIT_PRICE =
  "coalesce(salePrice, wholesalePrice, select(defined(wholesalePricePerPackage) && wholesaleMinQuantity > 0 => wholesalePricePerPackage / wholesaleMinQuantity), retailPrice)";

// GROQ Queries
const PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
]|order(name asc){
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

const FEATURED_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && featured == true
]|order(name asc)[0...8]{
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

/** Zadnjih 8 artikala u skladu s redoslijedom „Najnovije“ u shopu (`_createdAt desc`). */
const NEW_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
]|order(_createdAt desc)[0...8]{
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

const PARENT_CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
  && isParent == true
]|order(order asc, name asc){
  _id,
  name,
  slug,
  description,
  image,
  isParent,
  icon,
  order,
  "subcategories": *[_type == "category" && parent._ref == ^._id]|order(order asc, name asc){
    _id,
    name,
    slug,
    description,
    order
  }
}`;

const PRODUCT_BY_SLUG_QUERY = `*[
  _type == "product"
  && slug.current == $slug
  && inStock == true
][0]{
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

const SHOP_LIST_PROJECTION = `{
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

function shopProductOrderClause(sort: ShopSort): string {
  switch (sort) {
    case "popular":
      return "|order(featured desc, name asc)";
    case "newest":
      return "|order(_createdAt desc)";
    case "price-asc":
      return `|order(${GROQ_SHOP_UNIT_PRICE} asc, name asc)`;
    case "price-desc":
      return `|order(${GROQ_SHOP_UNIT_PRICE} desc, name asc)`;
    default:
      return "|order(featured desc, name asc)";
  }
}

function buildProductsPaginatedGroq(sort: ShopSort): string {
  return `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
]${shopProductOrderClause(sort)}[$start...$end]${SHOP_LIST_PROJECTION}`;
}

function buildProductsByCategorySlugsPaginatedGroq(sort: ShopSort): string {
  return `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && (
    category->slug.current in $categorySlugs
    || category->parent->slug.current in $categorySlugs
  )
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
]${shopProductOrderClause(sort)}[$start...$end]${SHOP_LIST_PROJECTION}`;
}

function buildProductsPaginatedGroqWithSearch(sort: ShopSort): string {
  return `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
  && (name match $searchQuery || description match $searchQuery)
]${shopProductOrderClause(sort)}[$start...$end]${SHOP_LIST_PROJECTION}`;
}

function buildProductsByCategorySlugsPaginatedGroqWithSearch(
  sort: ShopSort,
): string {
  return `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && (
    category->slug.current in $categorySlugs
    || category->parent->slug.current in $categorySlugs
  )
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
  && (name match $searchQuery || description match $searchQuery)
]${shopProductOrderClause(sort)}[$start...$end]${SHOP_LIST_PROJECTION}`;
}

const PRODUCTS_COUNT_QUERY = `count(*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
])`;

const PRODUCTS_BY_CATEGORY_SLUGS_COUNT_QUERY = `count(*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && (
    category->slug.current in $categorySlugs
    || category->parent->slug.current in $categorySlugs
  )
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
])`;

const PRODUCTS_COUNT_WITH_SEARCH_QUERY = `count(*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
  && (name match $searchQuery || description match $searchQuery)
])`;

const PRODUCTS_BY_CATEGORY_SLUGS_COUNT_WITH_SEARCH_QUERY = `count(*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && (
    category->slug.current in $categorySlugs
    || category->parent->slug.current in $categorySlugs
  )
  && ${GROQ_SHOP_UNIT_PRICE} >= $minPrice
  && ${GROQ_SHOP_UNIT_PRICE} <= $maxPrice
  && (!$saleOnly || defined(salePrice))
  && (name match $searchQuery || description match $searchQuery)
])`;

const SEARCH_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && (name match $searchQuery || description match $searchQuery)
]|order(name asc)[0...20]{
  _id,
  name,
  slug,
  sku,
  description,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesalePricePerPackage,
  wholesaleMinQuantity,
  packageContentsText,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes[]->{ _id, name, slug },
  colors[]->{ _id, name, hex, slug },
  inStock,
  featured,
  tags,
  material,
  weight,
  originCountry,
  specifications
}`;

// API Functions
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return await client.fetch(
    FEATURED_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getNewProducts(): Promise<Product[]> {
  return await client.fetch(
    NEW_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getParentCategories(): Promise<Category[]> {
  return await client.fetch(
    PARENT_CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsPaginated(
  start: number,
  end: number,
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  sort: ShopSort = "popular",
): Promise<Product[]> {
  return await client.fetch(
    buildProductsPaginatedGroq(sort),
    { start, end, minPrice, maxPrice, saleOnly },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsByCategorySlugsPaginated(
  categorySlugs: string[],
  start: number,
  end: number,
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  sort: ShopSort = "popular",
): Promise<Product[]> {
  return await client.fetch(
    buildProductsByCategorySlugsPaginatedGroq(sort),
    { categorySlugs, start, end, minPrice, maxPrice, saleOnly },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsCount(
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
): Promise<number> {
  return await client.fetch(
    PRODUCTS_COUNT_QUERY,
    { minPrice, maxPrice, saleOnly },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsByCategorySlugsCount(
  categorySlugs: string[],
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
): Promise<number> {
  return await client.fetch(
    PRODUCTS_BY_CATEGORY_SLUGS_COUNT_QUERY,
    { categorySlugs, minPrice, maxPrice, saleOnly },
    { next: { revalidate: 60 } },
  );
}

function shopSearchGroqParam(trimmedQuery: string): string {
  return `*${trimmedQuery}*`;
}

export async function getProductsPaginatedWithSearch(
  start: number,
  end: number,
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  sort: ShopSort,
  searchQuery: string,
): Promise<Product[]> {
  return await client.fetch(
    buildProductsPaginatedGroqWithSearch(sort),
    {
      start,
      end,
      minPrice,
      maxPrice,
      saleOnly,
      searchQuery: shopSearchGroqParam(searchQuery),
    },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsByCategorySlugsPaginatedWithSearch(
  categorySlugs: string[],
  start: number,
  end: number,
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  sort: ShopSort,
  searchQuery: string,
): Promise<Product[]> {
  return await client.fetch(
    buildProductsByCategorySlugsPaginatedGroqWithSearch(sort),
    {
      categorySlugs,
      start,
      end,
      minPrice,
      maxPrice,
      saleOnly,
      searchQuery: shopSearchGroqParam(searchQuery),
    },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsCountWithSearch(
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  searchQuery: string,
): Promise<number> {
  return await client.fetch(
    PRODUCTS_COUNT_WITH_SEARCH_QUERY,
    {
      minPrice,
      maxPrice,
      saleOnly,
      searchQuery: shopSearchGroqParam(searchQuery),
    },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsByCategorySlugsCountWithSearch(
  categorySlugs: string[],
  minPrice: number,
  maxPrice: number,
  saleOnly: boolean,
  searchQuery: string,
): Promise<number> {
  return await client.fetch(
    PRODUCTS_BY_CATEGORY_SLUGS_COUNT_WITH_SEARCH_QUERY,
    {
      categorySlugs,
      minPrice,
      maxPrice,
      saleOnly,
      searchQuery: shopSearchGroqParam(searchQuery),
    },
    { next: { revalidate: 60 } },
  );
}

export async function searchProducts(searchQuery: string): Promise<Product[]> {
  return await client.fetch(
    SEARCH_PRODUCTS_QUERY,
    { searchQuery: `*${searchQuery}*` },
    { next: { revalidate: 60 } },
  );
}
