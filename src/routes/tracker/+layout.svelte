<script lang="ts">
    import MonsterSearch from "./MonsterSearch.svelte";
    import MonsterStats from "./MonsterStats.svelte";
    import type { Monster } from "$lib/types/monster";
    import { writable } from "svelte/store";

    const activeMonster = writable<Monster | null>(null);

</script>

<div class="grid w-screen grid-cols-4 grid-rows-1 gap-4 p-4 h-svh">
    <div class="h-full">
        <MonsterSearch on:select={(e) => $activeMonster = e.detail}/>
    </div>

    <div class="col-span-2 space-y-4">
        <slot/>
    </div>

    <div class="h-full">
        {#if $activeMonster}
            <MonsterStats bind:monster={$activeMonster}/>
        {/if}
    </div>
</div>
