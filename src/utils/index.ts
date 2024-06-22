import { Icons } from "@/utils/icons";
import { MenuInterface } from "@/interfaces";

export function getIconClass(amenity: string): string {
  return Icons[amenity as keyof typeof Icons] || "";
}

export const menuItems: MenuInterface[] = [
  {
    name: "Home",
    icon: "home",
    path: "/",
    active: false,
  },
  {
    name: "Hotéis",
    icon: "hotel",
    path: "/hoteis",
    active: false,
  },
];

export const MOBILE_BREAKPOINT: number = 768;

export const SNACKBAR_TIME: number = 3000;
