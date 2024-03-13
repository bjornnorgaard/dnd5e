<script lang="ts">
    import type { Player } from "$lib/types/player";
    import { writable } from "svelte/store";
    import { players } from "$lib/stores/players";
    import { newUUID } from "$lib/utils/uuid.js";

    interface NewPlayerInput {
        name: string;
        maxHp: number;
        initiative: number;
        armorClass: number;
    }

    const input = writable<NewPlayerInput>(getDefaultInputValue());

    async function submit() {
        const newPlayer: Player = {
            id: newUUID(),
            name: $input.name,
            maxHp: $input.maxHp,
            currentHp: $input.maxHp,
            initiative: $input.initiative,
            armorClass: $input.armorClass,
        };

        players.add(newPlayer);
        input.set(getDefaultInputValue());
    }

    function getDefaultInputValue(): NewPlayerInput {
        return { name: "", maxHp: 0, initiative: 0, armorClass: 0 };
    }
</script>

<form on:submit|preventDefault={async () => await submit()} class="flex flex-col gap-4">
    <label class="label" for="name">
        <span>Name</span>
        <input class="input" type="text" id="name" autocomplete="off" bind:value={$input.name} placeholder="John Doe">
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
