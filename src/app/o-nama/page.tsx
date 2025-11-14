import Container from "@/components/layout/container";
import { Metadata } from "next";
import { Users, Target, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "ANE D.O.O. | O Nama",
  description:
    "Saznajte više o ANE D.O.O. - našoj misiji, vrijednostima i timu koji stoji iza našeg uspjeha.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">O Nama</h1>
        </div>
      </Container>
    </div>
  );
}

