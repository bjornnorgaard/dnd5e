<script lang="ts">
    import { tracker } from "$lib/stores/tracker";
    import { derived } from "svelte/store";

    export let encounterId: string;

    const playersInEncounter = derived(tracker, (t) => t.encounters.get(encounterId)?.playerIds.map((id) => t.players.get(id)) ?? []);
    const monstersInEncounter = derived(tracker, (t) => t.encounters.get(encounterId)?.monsters ?? []);

    function removePlayer(playerId: string) {
        tracker.removePlayerFromEncounter(encounterId, playerId);
    }

    function removeMonster(index: number) {
        tracker.removeMonsterFromEncounter(encounterId, index);
    }
</script>

{#each $tracker.encounters.entries() as [ _, v ]}

    {#if !encounterId && $tracker.encounters.has(encounterId)}
        <div class="flex flex-col items-center justify-center gap-4">
            <h2 class="h2">No encounter selected</h2>
            <p>Select an encounter from the list on the left to view its details</p>
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            <h2 class="h2">
                <input type="text" class="input h2 variant-ghost" bind:value={v.title}>
            </h2>

            <div class="table-container">
                <table class="table">
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
                    {#each $playersInEncounter ?? [] as p}
                        <tr>
                            <td>{p?.name}</td>
                            <td>{p?.currentHp}/{p?.maxHp}</td>
                            <td>{p?.armorClass}</td>
                            <td>{p?.initiative}</td>
                            <td>
                                <button class="btn btn-sm variant-outline-error" on:click={() => removePlayer(p?.id)}>Remove️</button>
                            </td>
                        </tr>
                    {/each}

                    {#each $monstersInEncounter as m, i}
                        <tr>
                            <td>{m.name}</td>
                            <td>{m.hit_points}</td>
                            <td>{m.armor_class}</td>
                            <td>{m.dexterity}</td>
                            <td>
                                <button class="btn btn-sm variant-outline-error" on:click={() => removeMonster(i)}>Remove️</button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
{/each}
