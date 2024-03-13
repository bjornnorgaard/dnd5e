<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
    import type { Encounter } from "$lib/types/encounter";
    import { goto } from "$app/navigation";
    import { writable } from "svelte/store";
    import { parties } from "$lib/stores/parties";
    import { players } from "$lib/stores/players";
    import { page } from "$app/stores";

    const encounter = writable<Encounter>($encounters.filter(e => e.id === $page.params.id)[0]);

    function deleteEncounter(e: Encounter) {
        encounters.remove(e);
        goto("/encounters");
    }

    function save() {
        encounters.update($encounter);
        goto("/encounters");
    }
</script>

<form on:submit|preventDefault={() => save()} class="flex flex-col gap-4">
    <label for="name" class="label">
        <span>Name</span>
        <input class="input" placeholder="The Battle of Tabletops" type="text" autocomplete="off" id="name" bind:value={$encounter.name}/>
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
        <button class="btn variant-filled-error" type="button" on:click={()=> deleteEncounter($encounter)}>Delete</button>
        <a class="btn variant-outline" href="/encounters">Cancel</a>
    </div>
</form>
