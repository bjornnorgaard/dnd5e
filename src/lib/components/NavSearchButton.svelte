<script>
    import { AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Search } from "lucide-svelte";
</script>

<AppRailAnchor class="cursor-pointer">
    <svelte:fragment slot="lead">
        <Search/>
    </svelte:fragment>
    <kbd class="kbd">⌘+K</kbd>
</AppRailAnchor>
