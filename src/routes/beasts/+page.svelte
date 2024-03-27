<script lang="ts">
    import CreatureSearch from "$lib/components/CreatureSearch.svelte";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { statblock } from "$lib/stores/statblock";
    import PageSection from "$lib/components/PageSection.svelte";
</script>

<PageWrapper title="Beasts" desc="View existing creatures and manage custom ones">
    <PageSection>
        <div class="flex gap-4">
            <div class="grow space-y-4">
                <CreatureSearch on:select={(e) => statblock.open(e.detail)}/>
            </div>
        </div>
    </PageSection>
</PageWrapper>
