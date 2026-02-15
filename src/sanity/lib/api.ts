import { client } from "./client";

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  salePrice?: number;
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
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  featured: boolean;
  new: boolean;
  order?: number;
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

// GROQ Queries
export const PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
]|order(order asc, name asc){
  _id,
  name,
  slug,
  description,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const FEATURED_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && featured == true
]|order(order asc, name asc)[0...8]{
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const NEW_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && new == true
]|order(order asc, name asc)[0...8]{
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const SALE_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && inStock == true
  && defined(salePrice)
]|order(order asc, name asc)[0...8]{
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
]|order(order asc, name asc){
  _id,
  name,
  slug,
  description,
  image,
  isParent,
  parent->{
    _id,
    name,
    slug
  },
  icon,
  order
}`;

export const PARENT_CATEGORIES_QUERY = `*[
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

export const SUBCATEGORIES_BY_PARENT_QUERY = `*[
  _type == "category"
  && defined(slug.current)
  && parent->slug.current == $parentSlug
]|order(order asc, name asc){
  _id,
  name,
  slug,
  description,
  order
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[
  _type == "product"
  && slug.current == $slug
  && inStock == true
][0]{
  _id,
  name,
  slug,
  description,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[
  _type == "product"
  && category->slug.current == $categorySlug
  && defined(slug.current)
  && inStock == true
]|order(order asc, name asc){
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const PRODUCTS_BY_PARENT_CATEGORY_QUERY = `*[
  _type == "product"
  && category->parent->slug.current == $parentSlug
  && defined(slug.current)
  && inStock == true
]|order(order asc, name asc){
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
}`;

export const SEARCH_PRODUCTS_QUERY = `*[
  _type == "product"
  && inStock == true
  && (name match $searchQuery || description match $searchQuery)
]|order(order asc, name asc)[0...20]{
  _id,
  name,
  slug,
  price,
  salePrice,
  images,
  category->{
    name,
    slug,
    parent->{
      name,
      slug
    }
  },
  sizes,
  colors,
  inStock,
  featured,
  new,
  order
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

export async function getSaleProducts(): Promise<Product[]> {
  return await client.fetch(
    SALE_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getCategories(): Promise<Category[]> {
  return await client.fetch(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getParentCategories(): Promise<Category[]> {
  return await client.fetch(
    PARENT_CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getSubcategoriesByParent(
  parentSlug: string,
): Promise<Category[]> {
  return await client.fetch(
    SUBCATEGORIES_BY_PARENT_QUERY,
    { parentSlug },
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

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return await client.fetch(
    PRODUCTS_BY_CATEGORY_QUERY,
    { categorySlug },
    { next: { revalidate: 60 } },
  );
}

export async function getProductsByParentCategory(
  parentSlug: string,
): Promise<Product[]> {
  return await client.fetch(
    PRODUCTS_BY_PARENT_CATEGORY_QUERY,
    { parentSlug },
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
