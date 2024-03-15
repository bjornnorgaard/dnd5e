<script lang="ts">
    import { writable } from "svelte/store";
    import type { Monster } from "$lib/types/monster";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatcher = createEventDispatcher();
    const monsters = writable<Monster[]>([]);
    let filter = "";

    async function searchMonsters(): Promise<void> {
        const res = await fetch(`/api/monsters/${filter}`);
        const data = await res.json();
        monsters.set(data);
    }

    function monsterClicked(monster: Monster) {
        dispatcher("select", monster);
    }

    onMount(async () => {
        await searchMonsters();
    })
</script>

<div class="flex h-full flex-col gap-4">
    <input class="input" placeholder="Search for monsters" type="search" bind:value={filter} on:input={() => searchMonsters()}>

    <div class="h-full table-container">
        <table class="table table-compact table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>CR</th>
                <th>AC</th>
            </tr>
            </thead>
            <tbody>
            {#each $monsters as m}
                <tr on:click={() => monsterClicked(m)} class="cursor-pointer">
                    <td>{m.name}</td>
                    <td>{m.challenge_rating}</td>
                    <td>{m.armor_class}</td>
                </tr>
            {/each}
        </table>
    </div>
</div>
