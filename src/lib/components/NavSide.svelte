<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { navRoute } from "$lib/constants/navigation";
</script>

<div class="h-full border-r-2 border-surface-900">
    <AppRail>
        {#each navRoute as r}
            <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname.includes(r.route) && r.route !== "/"}>
                <svelte:fragment slot="lead">
                    <svelte:component this={r.icon}/>
                </svelte:fragment>
                <span>{r.label}</span>
            </AppRailAnchor>
        {/each}
    </AppRail>
</div>
