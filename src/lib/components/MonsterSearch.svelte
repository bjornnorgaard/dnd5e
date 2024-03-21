<script lang="ts">
    import { writable } from "svelte/store";
    import { createEventDispatcher, onMount } from "svelte";
    import type { Monster } from "$lib/types/monster";

    const dispatcher = createEventDispatcher();
    const monsters = writable<Monster[]>([]);
    let filter = "";

    async function searchMonsters(): Promise<void> {
        const res = await fetch(`/api/monsters?filter=${filter}`);
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

<div class="flex flex-col gap-4">
    <input class="input" placeholder="Search for monsters" type="search" bind:value={filter} on:input={() => searchMonsters()}>

    <div class="table-container">
        <table class="table table-compact table-hover overflow-x-scroll">
            <thead>
            <tr>
                <th>Name</th>
                <th>CR</th>
                <th>AC</th>
            </tr>
            </thead>
            <tbody class="overflow-scroll">
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
