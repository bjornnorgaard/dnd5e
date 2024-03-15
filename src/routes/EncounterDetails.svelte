<script lang="ts">
    import type { Encounter } from "$lib/types/encounter";
    import { players } from "$lib/stores/players";
    import { parties } from "$lib/stores/parties";
    import { encounters } from "$lib/stores/encounters";
    import type { Player } from "$lib/types/player";
    import type { Party } from "$lib/types/party";
    import type { Monster } from "$lib/types/monster";

    export let encounter: Encounter;

    function removePlayer(p: Player) {
        const e = $encounters.filter(e => e.id === encounter.id)[0];
        e.playerIds = e.playerIds.filter(id => id !== p.id);
        encounters.updateEncounter(e);
    }

    function removeParty(p: Party) {
        const e = $encounters.filter(e => e.id === encounter.id)[0];
        e.partyIds = e.partyIds.filter(id => id !== p.id);
        encounters.updateEncounter(e);
    }

    function removeMonster(m: Monster) {
        const e = $encounters.filter(e => e.id === encounter.id)[0];
        e.monsters = e.monsters.filter(monster => monster !== m);
        encounters.updateEncounter(e);
    }
</script>

{#if encounter?.name}
    <div class="flex flex-col gap-4">
        <h2 class="h2">{encounter.name}</h2>

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
                {#each $players.filter(player => encounter.playerIds.includes(player.id)) ?? [] as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.currentHp}/{p.maxHp}</td>
                        <td>{p.armorClass}</td>
                        <td>{p.initiative}</td>
                        <td>
                            <button class="btn btn-sm variant-outline-error" on:click={() => removePlayer(p)}>Remove️</button>
                        </td>
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
                            <td>
                                <button class="btn btn-sm variant-outline-error" on:click={() => removeParty(party)}>Remove️</button>
                            </td>
                        </tr>
                    {/each}
                {/each}
                {#each $encounters.filter(e => e.id === encounter.id)[0].monsters as m}
                    <tr>
                        <td>{m.name}</td>
                        <td>{m.hit_points}</td>
                        <td>{m.armor_class}</td>
                        <td>{m.wisdom}</td>
                        <td>
                            <button class="btn btn-sm variant-outline-error" on:click={() => removeMonster(m)}>Remove️</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
{:else}
    <p>No encounter provided</p>
{/if}
