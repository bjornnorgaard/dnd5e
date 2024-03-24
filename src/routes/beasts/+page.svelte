<script lang="ts">
    import type { Creature } from "$lib/types/creature";
    import CreatureStats from "$lib/components/CreatureStats.svelte";
    import CreatureSearch from "$lib/components/CreatureSearch.svelte";
    import { slide } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";
    import PageWrapper from "$lib/components/PageWrapper.svelte";

    let selectedCreature: Creature | null = null;

    function creatureSelected(e: CustomEvent<Creature>) {
        selectedCreature = e.detail;
    }
</script>

<PageWrapper title="D&D 5th SRD Beastiary">
    <div class="flex gap-4">
        <div class="grow space-y-4">
            <CreatureSearch on:select={creatureSelected}/>
        </div>
        {#if selectedCreature}
            <div class="w-96" in:slide={{axis: "x", easing: cubicOut, duration: 100}} out:slide={{axis: "x", easing: cubicIn}}>
                <CreatureStats bind:monster={selectedCreature}/>
            </div>
        {/if}
    </div>
</PageWrapper>
