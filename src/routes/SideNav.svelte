<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { ArrowLeft, Dog, Group, Home, TestTube, Timer } from "lucide-svelte";
    import { page } from "$app/stores";

    interface Route {
        label: string;
        route: string;
        icon: any;
    }

    const routes: Route[] = [
        { label: "Tracker", route: "/tracker", icon: Timer },
        { label: "Players", route: "/tracker/players", icon: Group },
        { label: "Beasts", route: "/beastiary", icon: Dog },
        { label: "Sandbox", route: "/sandbox", icon: TestTube },
    ];
</script>
<AppRail>
    <svelte:fragment slot="lead">
        <AppRailAnchor href="/">
            <svelte:fragment slot="lead">
                <Home/>
            </svelte:fragment>
            <span>Home</span>
        </AppRailAnchor>
    </svelte:fragment>
    {#each routes as r, i}
        <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname === r.route}>
            <svelte:fragment slot="lead">
                <svelte:component this={r.icon}/>
            </svelte:fragment>
            <span>{r.label}</span>
        </AppRailAnchor>
    {/each}
    <svelte:fragment slot="trail">
        <AppRailAnchor href="/" title="Home">
            <svelte:fragment slot="lead">
                <ArrowLeft/>
            </svelte:fragment>
            <span>Home</span>
        </AppRailAnchor>
    </svelte:fragment>
</AppRail>
