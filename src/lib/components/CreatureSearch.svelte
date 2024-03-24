<script lang="ts">
    import { writable } from "svelte/store";
    import { createEventDispatcher, onMount } from "svelte";
    import type { Creature } from "$lib/types/creature";

    const dispatch = createEventDispatcher();
    const creatures = writable<Creature[]>([]);
    let filter = "";

    async function searchCreatures(): Promise<void> {
        const res = await fetch(`/api/creatures?filter=${filter}`);
        const data = await res.json();
        creatures.set(data);
    }

    function creatureClicked(creature: Creature) {
        dispatch("select", creature);
    }

    onMount(async () => {
        await searchCreatures();
    })
</script>

<div class="space-y-4">
    <input class="input" placeholder="Search for creatures" type="search" bind:value={filter} on:input={() => searchCreatures()}>


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
            {#each $creatures as m}
                <tr on:click={() => creatureClicked(m)} class="cursor-pointer">
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
                <td>{($creatures).length}</td>
            </tfoot>
        </table>
    </div>
</div>
