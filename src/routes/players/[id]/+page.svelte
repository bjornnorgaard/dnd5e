<script lang="ts">
    import type { Player } from "$lib/types/player";
    import { writable } from "svelte/store";
    import { players } from "$lib/stores/players";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const input = writable<Player>($players.filter(p => p.id === $page.params.id)[0]);

    async function save() {
        players.update($input);
        await goto("/players");
    }
</script>

<form on:submit|preventDefault={async () => await save()} class="flex flex-col gap-4">
    <label class="label" for="name">
        <span>Name</span>
        <input class="input" type="text" id="name" autocomplete="off" bind:value={$input.name} placeholder="John Doe">
    </label>
    <label class="label" for="currentHp">
        <span>Current HP</span>
        <input class="input" type="number" id="currentHp" autocomplete="off" bind:value={$input.currentHp}>
    </label>
    <label class="label" for="maxHp">
        <span>Max HP</span>
        <input class="input" type="number" id="maxHp" autocomplete="off" bind:value={$input.maxHp}>
    </label>
    <label class="label" for="armorClass">
        <span>Armor Class</span>
        <input class="input" type="number" id="armorClass" autocomplete="off" bind:value={$input.armorClass}>
    </label>
    <label class="label" for="initiative">
        <span>Initiative modifier</span>
        <input class="input" type="number" id="initiative" autocomplete="off" bind:value={$input.initiative}>
    </label>

    <div class="flex gap-4">
        <button class="btn variant-filled-primary" type="submit">Submit</button>
        <a class="btn variant-outline" href="/players">Cancel</a>
    </div>
</form>
