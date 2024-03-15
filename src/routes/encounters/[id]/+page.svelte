<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
    import type { Encounter } from "$lib/types/encounter";
    import { goto } from "$app/navigation";
    import { writable } from "svelte/store";
    import { parties } from "$lib/stores/parties";
    import { players } from "$lib/stores/players";
    import { page } from "$app/stores";
    import type { Party } from "$lib/types/party";
    import type { Player } from "$lib/types/player";
    import type { Monster } from "$lib/types/monster";

    const encounter = writable<Encounter>($encounters.filter(e => e.id === $page.params.id)[0]);
    const monsterSearchValue = writable<string>("");
    const monsters = writable<Monster[]>([]);

    async function searchMonsters() {
        if (!$monsterSearchValue.length) return [];
        const res = await fetch(`/api/monsters/${$monsterSearchValue}`);
        $monsters = await res.json();
    }

    async function deleteEncounter(e: Encounter) {
        encounters.removeEncounter(e);
        await goto("/encounters");
    }

    async function save() {
        encounters.updateEncounter($encounter);
        await goto("/encounters");
    }

    function removePlayer(p: Player) {
        $encounter.playerIds = $encounter.playerIds.filter(id => id !== p.id);
    }

    function addPlayer(p: Player) {
        $encounter.playerIds = [ ...$encounter.playerIds, p.id ];
    }

    function removeParty(p: Party) {
        $encounter.partyIds = $encounter.partyIds.filter(id => id !== p.id);
    }

    function addParty(p: Party) {
        $encounter.partyIds = [ ...$encounter.partyIds, p.id ];
    }

    function addMonster(m: Monster) {
        $encounter.monsters = [ ...$encounter.monsters, m ];
    }

    function removeMonster(m: Monster) {
        $encounter.monsters = $encounter.monsters.filter(monster => monster.slug !== m.slug);
    }
</script>

<div class="flex flex-col gap-4">
    <label for="name" class="label">
        <span>Name</span>
        <input class="input" placeholder="The Battle of Tabletops" type="text" autocomplete="off" id="name" bind:value={$encounter.name}/>
    </label>

    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>HP</th>
                <th>AC</th>
                <th>Mod</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {#each $players.filter(p => $encounter.playerIds.includes(p.id)) as player}
                <tr>
                    <td class="flex items-center gap-4">
                        <span>{player.name}</span>
                        <span class="badge variant-outline-success">Player</span>
                    </td>
                    <td>{player.currentHp}/{player.maxHp}</td>
                    <td>{player.armorClass}</td>
                    <td>{player.initiative}</td>
                    <td>
                        <button class="btn btn-sm variant-filled-error" on:click={() => removePlayer(player)}>Remove</button>
                    </td>
                </tr>
            {/each}
            {#each $parties.filter(p => $encounter.partyIds.includes(p.id)) as party}
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
                            <button class="btn btn-sm variant-filled-error" on:click={() => removeParty(party)}>Remove</button>
                        </td>
                    </tr>
                {/each}
            {/each}
            {#each $encounter.monsters as m}
                <tr>
                    <td class="flex items-center gap-4">
                        <span>{m.name}</span>
                        <span class="badge variant-outline-error">Monster</span>
                    </td>
                    <td>{m.hit_points}</td>
                    <td>{m.armor_class}</td>
                    <td></td>
                    <td>
                        <button class="btn btn-sm variant-filled-error" on:click={() => removeMonster(m)}>Remove</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div class="flex flex-col gap-4">
        <input type="search" class="input" placeholder="Search for monsters..." bind:value={$monsterSearchValue} on:input={async () => await searchMonsters()}>
        {#if $monsters.length}
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>CR</th>
                        <th>AC</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $monsters as r (r.slug)}
                        <tr>
                            <td>{r.name}</td>
                            <td>{r.cr} / {r.challenge_rating}</td>
                            <td>{r.armor_class}</td>
                            <td>{r.type}</td>
                            <td>
                                <button class="btn btn-sm variant-filled-primary" on:click={() => addMonster(r)}>Add</button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>

    <div class="flex flex-col  gap-4">
        <b class="text-center">Available <span class="badge variant-filled-secondary">Parties</span> and <span class="badge variant-filled-primary">Players</span> for this encounter</b>

        <div class="flex justify-center gap-4">
            {#if $parties.filter(p => !$encounter.partyIds.includes(p.id)).length}
                {@const availableParties = $parties.filter(p => !$encounter.partyIds.includes(p.id))}
                <ul class="flex gap-4">
                    {#each availableParties as p}
                        <li>
                            <button class="badge variant-filled-secondary" on:click={() => addParty(p)}>{p.name}</button>
                        </li>
                    {/each}
                </ul>
            {/if}

            {#if $players.filter(p => !$encounter.playerIds.includes(p.id)).length}
                {@const availablePlayers = $players.filter(p => !$encounter.playerIds.includes(p.id))}
                <ul class="flex justify-center gap-4">
                    {#each availablePlayers as p}
                        <li>
                            <button class="badge variant-filled-primary" on:click={() => addPlayer(p)}>{p.name}</button>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>

    <div class="flex gap-4">
        <button class="btn variant-filled-primary" type="submit" on:click={async () => await save()}>Submit</button>
        <button class="btn variant-filled-error" type="button" on:click={async ()=> await  deleteEncounter($encounter)}>Delete</button>
        <a class="btn variant-outline" href="/encounters">Cancel</a>
    </div>
</div>
