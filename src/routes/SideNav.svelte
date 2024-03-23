<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { CircleUser, Home, Library, Rabbit, Swords } from "lucide-svelte";
    import { page } from "$app/stores";

    interface Route {
        label: string;
        route: string;
        icon: any;
    }

    const routes: Route[] = [
        { label: "Combat", route: "/combat", icon: Swords },
        { label: "Beasts", route: "/beasts", icon: Rabbit },
        { label: "Spells", route: "/spells", icon: Library },
        { label: "Characters", route: "/characters", icon: CircleUser },
    ];
</script>

<AppRail>
    <AppRailAnchor href="/" title="Home" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">
            <svelte:component this={Home}/>
        </svelte:fragment>
        <span>Home</span>
    </AppRailAnchor>
    {#each routes as r}
        <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname.includes(r.route)}>
            <svelte:fragment slot="lead">
                <svelte:component this={r.icon}/>
            </svelte:fragment>
            <span>{r.label}</span>
        </AppRailAnchor>
    {/each}
</AppRail>
