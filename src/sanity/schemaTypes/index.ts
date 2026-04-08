import { type SchemaTypeDefinition } from "sanity";
import category from "./category";
import product from "./product";
import size from "./size";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, size],
};
