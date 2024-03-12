<script lang="ts">
    import type { Monster } from "$lib/types/monster";
    import { writable } from "svelte/store";
    import { parties } from "$lib/stores/parties";
    import { players } from "$lib/stores/players";
    import { encounters } from "$lib/stores/encounters";
    import type { Encounter } from "$lib/types/encounter";
    import { newUUID } from "$lib/utils/uuid.js";

    interface NewEncounterInput {
        name: string;
        partyIds: string[];
        playerIds: string[];
        monsters: Monster[];
    }

    const input = writable<NewEncounterInput>(getDefaultEncounter());

    function getDefaultEncounter(): NewEncounterInput {
        return {
            name: "",
            partyIds: [],
            playerIds: [],
            monsters: [],
        };
    }

    function submit() {
        const { name, partyIds, playerIds } = $input;
        const encounter: Encounter = {
            id: newUUID(),
            name,
            partyIds,
            playerIds,
            monsters: [],
        };
        encounters.add(encounter);
        input.set(getDefaultEncounter());
    }
</script>

<form on:submit|preventDefault={() => submit()}>
    <label for="name">Name
        <input type="text" autocomplete="off" id="name" bind:value={$input.name}/>
    </label>

    <fieldset>
        <legend>Parites</legend>
        {#each $parties as party}
            <label for={party.name}>
                <input type="checkbox" name={party.name} id={party.name} value={party.name}>
                {party.name}
            </label>
        {/each}
    </fieldset>

    <fieldset>
        <legend>Players</legend>
        {#each $players as player}
            <label for={player.name}>
                <input type="checkbox" name={player.name} id={player.name} value={player.name}>
                {player.name}
            </label>
        {/each}
    </fieldset>

    <button type="submit">Create</button>
    <button type="reset" on:click={() => input.set(getDefaultEncounter())}>Reset</button>
</form>
