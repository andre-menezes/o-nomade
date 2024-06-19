import { Icons } from "@/enums/icons";

export function getIconClass(amenity: string): string {
  return Icons[amenity as keyof typeof Icons] || "";
}
