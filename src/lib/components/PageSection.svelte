<script lang="ts">
    export let title: string;
    export let desc: string = "";
</script>

<section class="py-4 space-y-4">
    <hgroup>
        <h2 class="font-bold h2">{title}</h2>
        {#if desc}
            <span class="pl-1">{desc}</span>
        {/if}
    </hgroup>
    <slot/>
</section>
