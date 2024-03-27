<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    export let title: string;
    export let desc: string | null = null;
</script>

<div class="mx-auto max-w-screen-md space-y-8 py-[3vw] px-4">
    <AppBar background="bg-transparent" padding="">
        <svelte:fragment slot="headline">
            <h1 class="h1 font-bold">{title}</h1>
            {#if desc}
                <p>{desc}</p>
            {/if}
            <!--{#if getBreadcrumbs($page.url.pathname).length > 1}-->
            <!--    <ol class="breadcrumb pt-2">-->
            <!--        {#each getBreadcrumbs($page.url.pathname) as crumb, i}-->
            <!--            {#if i < getBreadcrumbs($page.url.pathname).length - 1}-->
            <!--                <li class="crumb"><a class="anchor" href={crumb.route}>{crumb.label}</a></li>-->
            <!--                <li class="crumb-separator" aria-hidden="true">/</li>-->
            <!--            {:else}-->
            <!--                <li class="crumb truncate">{crumb.label}</li>-->
            <!--            {/if}-->
            <!--        {/each}-->
            <!--    </ol>-->
            <!--{/if}-->
        </svelte:fragment>
    </AppBar>

    <slot/>
</div>
