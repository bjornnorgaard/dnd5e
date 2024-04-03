<script lang="ts">
    import { addDefaultPlayers } from "$lib/database/database";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
</script>

<PageWrapper title="D&D by Bear">
    <PageSection title="Quick Actions" desc="These are just for me while debugging">
        <button class="btn variant-filled-primary" on:click={async () => await addDefaultPlayers()}>Add Default Players</button>
    </PageSection>
</PageWrapper>
