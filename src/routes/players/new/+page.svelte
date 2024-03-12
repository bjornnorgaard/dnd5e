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

<form on:submit|preventDefault={async () => await submit()}>
    <label for="name">Name
        <input type="text" id="name" autocomplete="off" bind:value={$input.name}>
    </label>
    <label for="maxHp">Max HP
        <input type="number" id="maxHp" autocomplete="off" bind:value={$input.maxHp}>
    </label>
    <label for="initiative">Initiative
        <input type="number" id="initiative" autocomplete="off" bind:value={$input.initiative}>
    </label>
    <label for="armorClass">Armor Class
        <input type="number" id="armorClass" autocomplete="off" bind:value={$input.armorClass}>
    </label>

    <button type="submit">Submit</button>
</form>
