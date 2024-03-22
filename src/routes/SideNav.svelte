<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Group, Home, Rabbit, TableProperties, TestTube } from "lucide-svelte";
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
        { label: "Sandbox", route: "/sandbox", icon: TestTube },
    ];
</script>
<AppRail>
    {#each routes as r, i}
        <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname === r.route}>
            <svelte:fragment slot="lead">
                <svelte:component this={r.icon}/>
            </svelte:fragment>
            <span>{r.label}</span>
        </AppRailAnchor>
    {/each}
</AppRail>
