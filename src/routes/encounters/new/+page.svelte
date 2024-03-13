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

<form on:submit|preventDefault={() => submit()} class="flex flex-col gap-4">
    <label for="name" class="label">
        <span>Name</span>
        <input class="input" placeholder="The Battle of Tabletops" type="text" autocomplete="off" id="name" bind:value={$input.name}/>
    </label>

    <div class="space-y-1">
        <h3 class="h3">Parties</h3>
        {#each $parties as party}
            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox"/>
                <p>{party.name}</p>
            </label>
        {/each}
    </div>

    <div class="space-y-1">
        <h3 class="h3">Players</h3>
        {#each $players as player}
            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox"/>
                <span>{player.name}</span>
            </label>
        {/each}
    </div>

    <div class="flex gap-4">
        <button class="btn variant-filled-primary" type="submit">Submit</button>
        <a class="btn variant-outline" href="/encounters">Cancel</a>
    </div>
</form>
