<script lang="ts">
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db, type Player } from "$lib/utils/database";

    async function create() {
        const id = await db.players.add({
            name: "New Player",
            initiative: 0,
            currentHp: 0,
            maxHp: 0,
            armorClass: 0,
        });

        await goto(`/players/${id}`);
    }

    const players = liveQuery(async () => await db.players.toArray());

    async function removePlayer(player: Player) {
        if (!player.id) {
            console.error("No player id");
            return;
        }
        await db.players.delete(player.id);
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
            {#if !$players}
                <p>No players found</p>
            {:else}
                {#each $players as p (p.id)}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.initiative}</td>
                        <td>{p.currentHp}/{p.maxHp}</td>
                        <td>{p.armorClass}</td>
                        <td>
                            <a href={`/players/${p.id}`} class="btn btn-sm variant-outline">View</a>
                            <button class="btn btn-sm variant-outline-error" on:click={() => removePlayer(p)}>Delete</button>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <button on:click={async () => await create()} class="btn variant-filled-primary">Add New Player</button>
    </div>
</div>
