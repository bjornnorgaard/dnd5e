<script lang="ts">
    import { addDefaultPlayers } from "$lib/utils/database";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
</script>

<PageWrapper title="Home">
    <PageSection title="Quick Actions">
        <button class="btn variant-filled-primary" on:click={async () => await addDefaultPlayers()}>Add Default Players</button>
    </PageSection>
</PageWrapper>
