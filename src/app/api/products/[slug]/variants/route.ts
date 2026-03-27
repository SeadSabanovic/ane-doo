import { NextResponse } from "next/server";
import { getProductBySlug } from "@/sanity/lib/api";
import { buildProductColorOptions } from "@/constants/colors";
import { displaySizeLabel } from "@/constants/product-variants";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const sizeOptions = [
    ...(product.sizes ?? []).map((s) => displaySizeLabel(s)),
    ...(product.customSizes ?? []),
  ];
  const colorOptions = buildProductColorOptions(product.colors, product.customColors);

  return NextResponse.json(
    {
      sizeOptions,
      colorOptions,
    },
    { status: 200 },
  );
}

