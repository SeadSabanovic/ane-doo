import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import WishlistContent from "@/components/sections/wishlist/wishlist-content";

export const metadata: Metadata = {
  title: "Spašeni proizvodi",
  description:
    "Vaši omiljeni proizvodi na jednom mjestu. Pregledajte sve artikle koje ste sačuvali.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <>
      <PageHeader
        title="Spašeni proizvodi"
        description="Vaši omiljeni proizvodi na jednom mjestu"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Spašeni proizvodi", href: "/spaseno" },
        ]}
      />
      <Container className="pb-20">
        <WishlistContent />
      </Container>
    </>
  );
}
