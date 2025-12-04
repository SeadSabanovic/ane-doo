"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useLenis } from "lenis/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import SearchProduct from "./search-product";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const lenis = useLenis();

  // Disable/enable Lenis scroll when dialog opens/closes
  useEffect(() => {
    if (!lenis) return;

    if (open) {
      // Stop and destroy Lenis to completely disable scrolling when dialog opens
      lenis.stop();
      lenis.destroy();
    } else {
      lenis.start();
    }

    return () => {
      if (lenis && !open) {
        lenis.start();
      }
    };
  }, [open, lenis]);

  // Mock suggestions - replace with actual search logic
  const suggestions = [
    {
      id: 1,
      name: "Klasična majica - Crna",
      price: 16.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/57/de/dd/57dedd3f780ef00be19e543781155b12.jpg",
    },
    {
      id: 2,
      name: "Džemper sa V izrezom - Siva",
      price: 17.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/ae/f9/fe/aef9fe1869d8098043de2ba7388840eb.jpg",
    },
    {
      id: 3,
      name: "Chino hlače - Plava",
      price: 18.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/736x/82/3c/fa/823cfac2a92c5e7c817b82f67dfdc854.jpg",
    },
    {
      id: 4,
      name: "Trenerka - Crna",
      price: 19.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/f9/8d/82/f98d82c437fc45edb977be305cf9ec22.jpg",
    },
    {
      id: 5,
      name: "Košulja - Bijela",
      price: 20.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/67/e6/e7/67e6e7e4dd988bb2a54cfe976ef356c8.jpg",
    },
    {
      id: 6,
      name: "Duks sa kapuljačom - Siva",
      price: 21.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/736x/3f/35/3c/3f353c38b5567d6a28592dc79efe6e1c.jpg",
    },
    {
      id: 7,
      name: "Kaput - Bež",
      price: 22.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/27/4c/fd/274cfd022a45bda18b250c0bd6876630.jpg",
    },
    {
      id: 8,
      name: "Kratke hlače - Tamno plava",
      price: 23.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/05/f0/86/05f086c85e3a9acc032f94c2787927ec.jpg",
    },
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset search query when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setSearchQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl! p-0 h-[70svh] flex flex-col gap-0">
        <DialogHeader className="p-6 h-fit border-b flex flex-col gap-6">
          <DialogTitle>Pretražite proizvode</DialogTitle>
          <DialogDescription className="sr-only">
            Pretražite proizvode i kategorije
          </DialogDescription>

          {/* Search Bar */}
          <InputGroup className="bg-background">
            <InputGroupInput
              id="search-input"
              name="search"
              type="text"
              placeholder="Pretraga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="p-6 flex-1 overflow-scroll rounded-b-md">
          {searchQuery && filteredSuggestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nema rezultata za &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="space-y-2 flex flex-col gap-2">
              <h3 className="text-xl font-medium">Najprodavaniji komadi</h3>
              {filteredSuggestions.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => handleOpenChange(false)}
                >
                  <SearchProduct product={item} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
