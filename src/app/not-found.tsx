import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60svh] items-center justify-center py-16">
      <Container>
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
              404
            </h1>
            <h2 className="text-3xl font-bold">Stranica nije pronađena</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Nažalost, stranica koju tražite ne postoji ili je premještena.
            </p>
          </div>

          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home />
              Vrati se na početnu
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
