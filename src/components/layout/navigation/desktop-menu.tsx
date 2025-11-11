"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { menuData } from "./menuData";

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild decoration={false}>
        <Link
          href={href}
          className="flex flex-col gap-1 rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function DesktopMenu() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile} className="hidden lg:block">
      <NavigationMenuList className="">
        {menuData.map((item) => (
          <NavigationMenuItem key={item.id}>
            {item.submenu ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2">
                    {item.submenu.map((subItem) => (
                      <ListItem
                        key={subItem.id}
                        title={subItem.title}
                        href={subItem.path}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href={item.path}
                  target={item.newTab ? "_blank" : "_self"}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
