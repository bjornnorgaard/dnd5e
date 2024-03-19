<script lang="ts">
    import { parties } from "$lib/stores/parties";
    import { playerStore } from "$lib/stores/playerStore";
    import { writable } from "svelte/store";
    import type { Player } from "$lib/types/player";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { Party } from "$lib/types/tracker";

    const party = writable<Party>($parties.filter(p => p.id === $page.params.id)[0]);

    async function save() {
        parties.update($party);
        await goto('/parties');
    }

    function removePlayer(p: Player) {
        $party.playerIds = $party.playerIds.filter(id => id !== p.id);
    }

    function addPlayer(p: Player) {
        $party.playerIds = [ ...$party.playerIds, p.id ];
    }

</script>

<form on:submit={async () => await save()}>
    <label class="label" for="name">
        <span>Name</span>
        <input class="input" type="text" id="name" autocomplete="off" bind:value={$party.name} placeholder="The Protagonists">
    </label>
</form>

{#if $playerStore.filter(p => !$party.playerIds.includes(p.id)).length}
    {@const availablePlayers = $playerStore.filter(p => !$party.playerIds.includes(p.id))}
    <b class="text-center">Players not in this party (yet)</b>
    <div class="flex justify-center gap-4">
        {#each availablePlayers as p}
            <button class="badge variant-filled-primary" on:click={() => addPlayer(p)}>{p.name}</button>
        {/each}
    </div>
{/if}

<div class="table-container">
    <table class="table table-hover">
        <thead>
        <tr>
            <th>Name</th>
            <th>HP</th>
            <th>AC</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each $playerStore.filter(player => $party.playerIds.includes(player.id)) ?? [] as p}
            <tr>
                <td>{p.name}</td>
                <td>{p.currentHp}/{p.maxHp}</td>
                <td>{p.armorClass}</td>
                <td>
                    <button on:click={() => removePlayer(p)}>Remove</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<div class="flex gap-4">
    <button class="btn variant-filled-primary" on:click={async () => await save()}>Save</button>
    <button class="btn variant-outline" on:click={async () => await goto('/parties')}>Cancel</button>
</div>
