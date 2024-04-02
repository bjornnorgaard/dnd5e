<script>
    import { AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Search } from "lucide-svelte";
    import { page } from "$app/stores";
</script>

<AppRailAnchor class="cursor-pointer" target="_self" href={$page.route.id}>
    <svelte:fragment slot="lead">
        <Search/>
    </svelte:fragment>
    <kbd class="kbd">⌘+K</kbd>
</AppRailAnchor>
