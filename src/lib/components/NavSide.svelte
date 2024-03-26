<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Home } from "lucide-svelte";
    import { page } from "$app/stores";
    import { routes } from "$lib/constants/routes";
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
