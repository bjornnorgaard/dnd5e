<script lang="ts">
    import type { Encounter } from "$lib/types/encounter";
    import { players } from "$lib/stores/players";
    import { parties } from "$lib/stores/parties";

    export let encounter: Encounter;
</script>

{#if encounter?.name}
    <div class="card p-4 flex flex-col gap-4">
        <h2 class="h2">{encounter.name}</h2>

        <div class="table-container">
            <table class="table">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>HP</th>
                    <th>AC</th>
                    <th>Initiative</th>
                </tr>
                </thead>
                <tbody>
                {#each $players.filter(player => encounter.playerIds.includes(player.id)) ?? [] as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.currentHp}/{p.maxHp}</td>
                        <td>{p.armorClass}</td>
                        <td>{p.initiative}</td>
                    </tr>
                {/each}
                {#each $parties.filter(p => encounter.partyIds.includes(p.id)) as party}
                    {#each $players.filter(p => party.playerIds.includes(p.id)) as player}
                        <tr>
                            <td class="flex items-center gap-4">
                                <span>{player.name}</span>
                                <span class="badge variant-outline-primary">{party.name}</span>
                            </td>
                            <td>{player.currentHp}/{player.maxHp}</td>
                            <td>{player.armorClass}</td>
                            <td>{player.initiative}</td>
                        </tr>
                    {/each}
                {/each}
                </tbody>
            </table>
        </div>
    </div>
{:else}
    <p>No encounter provided</p>
{/if}
