import { BookHeart, Home, Library, Rabbit, Swords } from "lucide-svelte";

export interface Route {
    label: string;
    route: string;
    icon: any;
}

export const routes: Route[] = [
    { label: "Home", route: "/", icon: Home },
    { label: "Combat", route: "/combat", icon: Swords },
    { label: "Beasts", route: "/beasts", icon: Rabbit },
    { label: "Spells", route: "/spells", icon: Library },
    { label: "Sheet", route: "/characters", icon: BookHeart },
];
