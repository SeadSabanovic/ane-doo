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
import { usePathname } from "next/navigation";
import { menuData } from "./menuData";
import Container from "../container";
import { Badge } from "@/components/ui/badge";

function ListItem({
  title,
  children,
  href,
  isActive = false,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  isActive?: boolean;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild decoration={false} isActive={isActive}>
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
  const pathname = usePathname();

  return (
    <div className="border-b lg:block hidden">
      <Container className="flex items-center justify-between">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="">
            {menuData.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname === item.path ||
                    pathname.startsWith(item.path + "/");
              return (
                <NavigationMenuItem key={item.id}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                          {item.submenu.map((subItem) => {
                            const subItemIsActive =
                              subItem.path === "/"
                                ? pathname === "/"
                                : pathname === subItem.path ||
                                  pathname.startsWith(subItem.path + "/");
                            return (
                              <ListItem
                                key={subItem.id}
                                title={subItem.title}
                                href={subItem.path}
                                isActive={subItemIsActive}
                              />
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                      isActive={isActive}
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
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/shop" className="font-medium flex gap-3">
          Najprodavanije
          <Badge>AKCIJA</Badge>
        </Link>
      </Container>
    </div>
  );
}
