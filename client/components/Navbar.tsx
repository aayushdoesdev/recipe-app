"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { useCookies } from "react-cookie";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const router = useRouter();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    router.push('/auth');
  };

  return (
    <nav className="w-full py-5 flex justify-center">
      <NavigationMenu className=" space-x-5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/create-recipe" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create Recipe
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/saved-recipes" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Saved Recipes
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {!cookies.access_token ? (
              <Link href="/auth" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login/Register
                </NavigationMenuLink>
              </Link>
            ) : (
              <Button onClick={logout}>Logout</Button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
        <DarkModeToggle />
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
