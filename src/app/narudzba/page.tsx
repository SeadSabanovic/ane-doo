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
      name: "Klasična majica",
      image:
        "https://i.pinimg.com/1200x/57/de/dd/57dedd3f780ef00be19e543781155b12.jpg",
      quantity: 2, // 2 pakovanja (za wholesale) ili 2 komada (za retail)
      size: "M",
      color: "Crna",
      pricing: {
        retail: 16.99,
        wholesale: {
          price: 14.99, // Cijena po artiklu
          itemsPerPack: 10, // 10 majica po pakovanju
        },
      },
    },
    {
      id: 2,
      name: "Džemper sa V izrezom",
      image:
        "https://i.pinimg.com/1200x/ae/f9/fe/aef9fe1869d8098043de2ba7388840eb.jpg",
      quantity: 1, // 1 komad
      size: "L",
      color: "Siva",
      pricing: {
        retail: 17.99,
        // Nema wholesale opciju - samo maloprodajna cijena
      },
    },
    {
      id: 3,
      name: "Chino hlače",
      image:
        "https://i.pinimg.com/736x/82/3c/fa/823cfac2a92c5e7c817b82f67dfdc854.jpg",
      quantity: 4,
      size: "M",
      color: "Plava",
      pricing: {
        retail: 18.99,
      },
    },
    {
      id: 4,
      name: "Košulja",
      image:
        "https://i.pinimg.com/1200x/67/e6/e7/67e6e7e4dd988bb2a54cfe976ef356c8.jpg",
      quantity: 1, // 1 komad
      size: "L",
      color: "Bijela",
      pricing: {
        retail: 20.99,
      },
    },
    {
      id: 5,
      name: "Duks sa kapuljačom",
      image:
        "https://i.pinimg.com/736x/3f/35/3c/3f353c38b5567d6a28592dc79efe6e1c.jpg",
      quantity: 2, // 2 pakovanja (za wholesale)
      size: "M",
      color: "Siva",
      pricing: {
        retail: 21.99,
        wholesale: {
          price: 18.99, // Cijena po artiklu
          itemsPerPack: 10, // 10 duksova po pakovanju
        },
      },
    },
  ];

  // Izračunaj ukupnu cijenu uzimajući u obzir retail/wholesale tip
  const subtotal = cartItems.reduce((sum, item) => {
    if (item.pricing.wholesale) {
      // Za wholesale: quantity = broj pakovanja, cijena je po artiklu
      // Ukupna cijena = broj pakovanja × artikala po pakovanju × cijena po artiklu
      return (
        sum +
        item.pricing.wholesale.price *
          item.quantity *
          item.pricing.wholesale.itemsPerPack
      );
    } else {
      // Za retail: quantity = broj komada, cijena je po komadu
      return sum + item.pricing.retail * item.quantity;
    }
  }, 0);
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
        <OrderSummary cartItems={cartItems} total={total} />

        {/* Checkout Form */}
        <CheckoutForm />
      </Container>
    </>
  );
}
