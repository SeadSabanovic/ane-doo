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
    { id: 1, title: "Muška odjeća", href: "/shop?category=mens" },
    { id: 2, title: "Ženska odjeća", href: "/shop?category=womens" },
    { id: 3, title: "Dječija odjeća", href: "/shop?category=kids" },
    { id: 4, title: "Sportska odjeća", href: "/shop?category=sports" },
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        <DialogHeader className="p-6 h-fit">
          <DialogTitle>Pretražite proizvode</DialogTitle>
          <DialogDescription className="sr-only">
            Pretražite proizvode i kategorije
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="border-b p-6 pt-0">
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
        </div>

        {/* Dialog Body */}
        <div className="p-6 pt-0 flex-1 overflow-scroll rounded-b-md">
          <div className="py-6">
            {searchQuery && filteredSuggestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nema rezultata za &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="space-y-2">
                {filteredSuggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleOpenChange(false)}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
                  >
                    <Search className="size-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
