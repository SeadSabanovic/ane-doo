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
      name: "Klasična majica - Crna",
      price: 16.99,
      image:
        "https://i.pinimg.com/1200x/57/de/dd/57dedd3f780ef00be19e543781155b12.jpg",
      quantity: 2,
      size: "M",
      color: "Crna",
    },
    {
      id: 2,
      name: "Džemper sa V izrezom - Siva",
      price: 17.99,
      image:
        "https://i.pinimg.com/1200x/ae/f9/fe/aef9fe1869d8098043de2ba7388840eb.jpg",
      quantity: 1,
      size: "L",
      color: "Siva",
    },
    {
      id: 3,
      name: "Chino hlače - Plava",
      price: 18.99,
      image:
        "https://i.pinimg.com/736x/82/3c/fa/823cfac2a92c5e7c817b82f67dfdc854.jpg",
      quantity: 1,
      size: "M",
      color: "Plava",
    },
    {
      id: 4,
      name: "Košulja - Bijela",
      price: 20.99,
      image:
        "https://i.pinimg.com/1200x/67/e6/e7/67e6e7e4dd988bb2a54cfe976ef356c8.jpg",
      quantity: 1,
      size: "L",
      color: "Bijela",
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
      <Container className="pb-20 flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />

        {/* Checkout Form */}
        <CheckoutForm />
      </Container>
    </>
  );
}
