<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Home, Rabbit, TableProperties } from "lucide-svelte";
    import { page } from "$app/stores";

    interface Route {
        label: string;
        route: string;
        icon: any;
    }

    const routes: Route[] = [
        { label: "Home", route: "/", icon: Home },
        { label: "Tracker", route: "/tracker", icon: TableProperties },
        { label: "Beasts", route: "/beasts", icon: Rabbit },
    ];
</script>
<AppRail>
    {#each routes as r}
        <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname === r.route}>
            <svelte:fragment slot="lead">
                <svelte:component this={r.icon}/>
            </svelte:fragment>
            <span>{r.label}</span>
        </AppRailAnchor>
    {/each}
</AppRail>
