<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    export let title: string;
    export let desc: string | null = null;
</script>

<div class="mx-auto max-w-screen-md space-y-8 py-[2vw] px-4">
    <AppBar background="bg-transparent" padding="">
        <svelte:fragment slot="headline">
            <h1 class="h1 font-bold">{title}</h1>
            {#if desc}
                <p>{desc}</p>
            {/if}
        </svelte:fragment>
    </AppBar>
    <slot/>
</div>
