<script lang="ts">
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db, type Player } from "$lib/utils/database";
    import PageWrapper from "$lib/components/PageWrapper.svelte";

    async function create() {
        const id = await db.players.add({
            name: "New Player",
            initiative: 0,
            currentHp: 0,
            maxHp: 0,
            armorClass: 0,
        });

        await goto(`/combat/players/${id}`);
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

<PageWrapper title="Campaign Players">
    <div class="table-container">
        <table class="table table-hover table-compact">
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
                    <tr on:click={async () => await goto(`/combat/players/${p.id}`)} class="cursor-pointer">
                        <td>{p.name}</td>
                        <td>{p.initiative}</td>
                        <td>{p.currentHp}/{p.maxHp}</td>
                        <td>{p.armorClass}</td>
                        <td>
                            <button class="btn btn-sm text-error-500" on:click={() => removePlayer(p)}>Delete</button>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
    <div>
        <button on:click={async () => await create()} class="btn variant-filled-primary">Add new player</button>
    </div>
</PageWrapper>
