"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { menuData } from "./menuData";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-3 lg:hidden"
          aria-label="Otvori mobilni meni"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-full! bg-primary/70 backdrop-blur-sm! border-none"
      >
        <SheetHeader>
          <SheetTitle className="text-accent text-2xl font-bold">
            ANE D.O.O.
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigirajte kroz stranicu koristeći meni opcije
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 p-4 text-primary-foreground">
          {menuData.map((item) => (
            <div key={item.id}>
              <Link
                href={item.path}
                target={item.newTab ? "_blank" : "_self"}
                className="font-medium text-lg hover:underline block"
                onClick={handleNavigate}
              >
                {item.title}
              </Link>
              {item.submenu && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.path}
                      target={subItem.newTab ? "_blank" : "_self"}
                      className="font-medium text-lg hover:underline text-secondary"
                      onClick={handleNavigate}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
