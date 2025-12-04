import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import CheckoutForm from "@/components/sections/checkout/checkout-form";
import OrderSummary from "@/components/sections/checkout/order-summary";

export const metadata: Metadata = {
  title: "Narudžba",
  description:
    "Završite vašu narudžbu. Unesite podatke za dostavu i odaberite način plaćanja.",
};

export default function CheckoutPage() {
  // Privremeni dummy podaci za korpu
  const cartItems = [
    {
      id: 1,
      name: "Basic T-Shirt",
      price: 29.99,
      image: "/images/product/shirt.png",
      quantity: 2,
      size: "M",
      color: "Crna",
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 89.99,
      image: "/images/product/shirt.png",
      quantity: 1,
      size: "L",
      color: "Dark Blue",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  return (
    <>
      <PageHeader
        title="Narudžba"
        description="Pregledajte i potvrdite svoju narudžbu. Završite proces kupovine u par koraka."
      />

      <Container className="pb-20 flex flex-col gap-8">
        {/* Checkout Form */}
        <CheckoutForm />

        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />
      </Container>
    </>
  );
}
