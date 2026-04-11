import { NextResponse } from "next/server";
import { getProductBySlug } from "@/sanity/lib/api";
import { buildProductColorOptions } from "@/constants/colors";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const sizeOptions = (product.sizes ?? [])
    .filter((s): s is NonNullable<typeof s> => s != null)
    .map((s) => s.name);
  const colorOptions = buildProductColorOptions(product.colors);

  return NextResponse.json(
    {
      sizeOptions,
      colorOptions,
    },
    { status: 200 },
  );
}
