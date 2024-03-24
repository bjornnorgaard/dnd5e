<script lang="ts">
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db } from "$lib/utils/database";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { newPlayer } from "$lib/utils/typeConstructors.js";
    import type { Creature } from "$lib/types/creature";

    async function create() {
        const player = newPlayer({
            name: "New Player",
            hitPoints: 10,
            armorClass: 10,
            dexterity: 10,
        });

        const id = await db.creatures.add(player);
        await goto(`/combat/creatures/${id}`);
    }

    const players = liveQuery(async () => await db.creatures.toArray());

    async function removePlayer(player: Creature) {
        if (!player.slug) {
            console.error("No player id");
            return;
        }
        await db.creatures.delete(player.slug);
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
                {#each $players as p (p.slug)}
                    <tr on:click={async () => await goto(`/combat/creatures/${p.slug}`)} class="cursor-pointer">
                        <td>{p.name}</td>
                        <td>{p.dexterity}</td>
                        <td>{p.current_hit_points}/{p.hit_points}</td>
                        <td>{p.armor_class}</td>
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
