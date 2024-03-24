<script lang="ts">
    import CreatureSearch from "$lib/components/CreatureSearch.svelte";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { statblock } from "$lib/stores/statblock";
</script>

<PageWrapper title="D&D 5th SRD Beastiary">
    <div class="flex gap-4">
        <div class="grow space-y-4">
            <CreatureSearch on:select={(e) => statblock.open(e.detail)}/>
        </div>
    </div>
</PageWrapper>
