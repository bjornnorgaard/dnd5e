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

<div class="space-y-4">
    <input class="input" placeholder="Search for monsters" type="search" bind:value={filter} on:input={() => searchMonsters()}>


    <div class="table-container">
        <table class="table table-compact table-hover">
            <thead>
            <tr>
                <th>CR</th>
                <th>Name</th>
                <th>AC</th>
                <th>Type</th>
                <th>Size</th>
                <th>Alignment</th>
            </tr>
            </thead>
            <tbody>
            {#each $monsters as m}
                <tr on:click={() => monsterClicked(m)} class="cursor-pointer">
                    <td>{m.challenge_rating}</td>
                    <td>{m.name}</td>
                    <td>{m.armor_class}</td>
                    <td>{m.type}</td>
                    <td>{m.size}</td>
                    <td>{m.alignment}</td>
                </tr>
            {/each}
            </tbody>
            <tfoot>
            <tr class="font-bold">
                <td colspan="5">Total results</td>
                <td>{($monsters).length}</td>
            </tfoot>
        </table>
    </div>
</div>
