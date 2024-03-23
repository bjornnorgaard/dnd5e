<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { getBreadcrumbs } from "$lib/utils/breadcrumbs";

    export let title: string;

</script>

<div>
    <AppBar>
        <svelte:fragment slot="headline">
            <h1 class="h1 font-bold">{title}</h1>
            <ol class="breadcrumb p-2">
                {#each getBreadcrumbs($page.url.pathname) as crumb, i}
                    <!-- If crumb index is less than the breadcrumb length minus 1 -->
                    {#if i < getBreadcrumbs($page.url.pathname).length - 1}
                        <li class="crumb"><a class="anchor" href={crumb.route}>{crumb.label}</a></li>
                        <li class="crumb-separator" aria-hidden="true">/</li>
                    {:else}
                        <li class="crumb">{crumb.label}</li>
                    {/if}
                {/each}
            </ol>
        </svelte:fragment>

    </AppBar>

    <div class="mx-auto max-w-screen-lg">
        <slot/>
    </div>
</div>
