<script lang="ts">
    import { players } from "$lib/stores/players";
    import type { Player } from "$lib/types/player";
    import { newUUID } from "$lib/utils/uuid";
    import { goto } from "$app/navigation";

    async function create() {
        const newPlayer: Player = {
            id: newUUID(),
            name: "Unnamed Player",
            currentHp: 15,
            maxHp: 15,
            initiative: 2,
            armorClass: 16,
        };

        players.add(newPlayer)
        await goto(`/players/${newPlayer.id}`);
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
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each $players as p}
                <tr>
                    <td>{p.name}</td>
                    <td>{p.initiative}</td>
                    <td>{p.currentHp}/{p.maxHp}</td>
                    <td>{p.armorClass}</td>
                    <td>
                        <a href={`/players/${p.id}`} class="btn btn-sm variant-outline">View</a>
                        <button class="btn btn-sm variant-outline-error" on:click={() => players.remove(p)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <button on:click={async () => await create()} class="btn variant-filled-primary">Add New Player</button>
    </div>
</div>
