<script lang="ts">
    import { page } from "$app/stores";
    import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
    import { routes } from "$lib/constants/routes";
</script>

<TabGroup
        justify="justify-center"
        active="variant-filled-primary"
        hover="hover:variant-soft-primary"
        flex="flex-1"
        rounded=""
        border="border-t-2 border-primary-500"
        class="bg-surface-100-800-token w-full">
    {#each routes as r}
        <TabAnchor href={r.route} selected={$page.url.pathname.includes(r.route)}>
            <svelte:fragment slot="lead">
                <div class="flex justify-center">
                    <svelte:component this={r.icon}/>
                </div>
            </svelte:fragment>
            <span>{r.label}</span>
        </TabAnchor>
    {/each}
</TabGroup>
