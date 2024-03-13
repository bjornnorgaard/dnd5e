<script lang="ts">
    import { writable } from "svelte/store";
    import { parties } from "$lib/stores/parties";
    import { onMount } from "svelte";
    import { newUUID } from "$lib/utils/uuid.js";

    interface NewPartyInput {
        name: string;
    }

    const input = writable<NewPartyInput>(defaultInputParty());

    onMount(() => input.set(defaultInputParty()))

    async function submit() {
        parties.add({
            id: newUUID(),
            name: $input.name,
            playerIds: [],
        });

        reset();
    }

    function reset() {
        input.set(defaultInputParty());
    }

    function defaultInputParty(): NewPartyInput {
        return {
            name: "Protagonists",
        };
    }

</script>

<form on:submit|preventDefault={async () => await submit()} class="flex flex-col gap-4">
    <label for="name" class="label">
        <span>Name</span>
        <input class="input" type="text" id="name" bind:value={$input.name}>
    </label>

    <div class="flex gap-4">
        <button class="btn variant-filled-primary" type="submit">Submit</button>
        <a class="btn variant-outline" href="/parties">Cancel</a>
    </div>
</form>
