<script lang="ts">

    import type { Monster } from "$lib/types/monster";

    export let monster: Monster;
</script>

{#if monster?.name?.length}
    <div class="card p-4">
        <pre>{JSON.stringify(monster, null, 2)}</pre>
    </div>
{/if}
