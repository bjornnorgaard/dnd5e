<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

    const dispatch = createEventDispatcher();

    export let id: string;
    export let label: string;
    export let help: string = "";

    const settings: PopupSettings = {
        event: 'click',
        target: label + id,
        placement: 'top',
    };

    function emitKeydown(e: KeyboardEvent) {
        if (e.key !== "Enter") {
            return;
        }

        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value);
        if (isNaN(value)) {
            console.error("Invalid value");
            return;
        }

        dispatch("submit", {
            id: id,
            value: value,
        });

        target.value = "";
    }

    function onElementClicked(id: string) {
        const input = document.getElementById(id);
        if (input) input.focus();
    }
</script>

<div class="w-60 rounded bg-gradient-to-b p-4 text-start text-neutral-50 card from-surface-600 to-surface-600"
     data-popup={label+id}>

    <label for="damage" class="label flex flex-col">
        <span>{label}</span>
        <input type="number" class="input" id={label+id} on:keydown={emitKeydown}>
        {#if help}
            <span class="text-sm">{help}</span>
        {/if}
    </label>
    <div class="arrow bg-surface-600"/>
</div>

<button class="rounded px-2 hover:variant-filled-primary"
        on:click|stopPropagation={() => onElementClicked(label+id)}
        use:popup={settings}>
    <slot/>
</button>
