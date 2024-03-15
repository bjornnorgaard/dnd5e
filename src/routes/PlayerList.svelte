<script lang="ts">
    import { players } from "$lib/stores/players";
    import { createEventDispatcher } from "svelte";
    import type { Player } from "$lib/types/player";

    const dispatcher = createEventDispatcher();

    function playerClicked(player: Player) {
        dispatcher("select", player);
    }

</script>

<div class="flex flex-col gap-4">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Initiative</th>
                <th>Current/Max HP</th>
                <th>Armor Class</th>
            </tr>
            </thead>
            <tbody>
            {#each $players as p}
                <tr on:click={() => playerClicked(p)}>
                    <td>{p.name}</td>
                    <td>{p.initiative}</td>
                    <td>{p.currentHp}/{p.maxHp}</td>
                    <td>{p.armorClass}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
