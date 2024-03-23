<script lang="ts">
    export let title: string;
    export let desc: string = "";
</script>

<section class="bg-gradient-to-br p-4 py-4 shadow space-y-4 card from-surface-700 to-surface-800">
    <hgroup>
        <h2 class="font-bold tracking-tighter h2">{title}</h2>
        {#if desc}
            <p>{desc}</p>
        {/if}
    </hgroup>
    <slot/>
</section>
