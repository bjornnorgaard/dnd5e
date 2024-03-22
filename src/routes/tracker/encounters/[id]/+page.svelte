<script lang="ts">
    import { liveQuery } from "dexie";
    import { db } from "$lib/utils/database";
    import { ProgressBar } from "@skeletonlabs/skeleton";

    export let data;
    const encounter = liveQuery(() => db.encounters.get(Number(data.id)));
    const players = liveQuery(() => db.players.toArray());

    async function titleChanged(e: any) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }
        const updated = $encounter;
        updated.title = e.target.value;
        await db.encounters.put(updated, updated.id);
    }

    async function addPlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        if (updated.playerIds.includes(id)) {
            console.log("Player already in encounter");
            return;
        }

        updated.playerIds.push(id);
        await db.encounters.put(updated, updated.id);
    }

    async function removePlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        updated.playerIds = updated.playerIds.filter(p => p !== id);
        await db.encounters.put(updated, updated.id);
    }
</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    <div class="flex flex-col gap-4">
        <h2 class="h2">
            <input type="text" class="input h2 variant-ghost" value={$encounter.title} on:input={(e) => titleChanged(e)}>
        </h2>

        <div class="table-container">
            <table class="table table-compact">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>HP</th>
                    <th>AC</th>
                    <th>Initiative</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {#if $players}
                    {#each $players.filter(p => $encounter?.playerIds.includes(p.id)) as p}
                        <tr>
                            <td>{p.name}</td>
                            <td>{p.currentHp}/{p.maxHp}</td>
                            <td>{p.armorClass}</td>
                            <td>{p.initiative}</td>
                            <td class="space-x-2">
                                <a href={`/tracker/players/${p.id}`} class="btn btn-sm variant-soft-secondary">view</a>
                                <button class="btn btn-sm variant-soft-error" on:click={() => removePlayer(p.id)}>remove️</button>
                            </td>
                        </tr>
                    {/each}
                {/if}
                {#each $encounter.monsters as m, i}
                    <tr>
                        <td>{m.name}</td>
                        <td>{m.hit_points}</td>
                        <td>{m.armor_class}</td>
                        <td>{m.dexterity}</td>
                        <td>
                            <button class="btn btn-sm text-error-500" on:click={() => console.log("remove clicked")}>Remove️</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="h3">Players</h3>
                <p class="italic text-sm">Click to add a player to the encounter</p>
            </div>
            <div class="p-4">
                {#if !$players}
                    <ProgressBar value={undefined}/>
                {:else}
                    <div class="flex gap-4">
                        {#each $players as p}
                            <button class="chip"
                                    class:variant-soft-secondary={!$encounter.playerIds.includes(p.id)}
                                    class:hover:variant-filled-primary={!$encounter.playerIds.includes(p.id)}
                                    class:chip-disabled={$encounter.playerIds.includes(p.id)}
                                    disabled={$encounter.playerIds.includes(p.id)}
                                    on:click={() => addPlayer(p.id)}>
                                <span>{p.name}</span>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
