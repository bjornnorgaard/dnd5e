<script lang="ts">
    import CreatureSearch from "$lib/components/CreatureSearch.svelte";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { goto } from "$app/navigation";

    import { routes } from "$lib/constants/routes";

    async function onCreatureSelect(e: CustomEvent) {
        await goto(routes.api_creature_slug(e.detail.slug));
    }
</script>

<PageWrapper title="Beasts" desc="View existing creatures and manage custom ones">
    <PageSection>
        <div class="flex gap-4">
            <div class="grow space-y-4">
                <CreatureSearch on:select={async (e) =>await onCreatureSelect(e)}/>
            </div>
        </div>
    </PageSection>
</PageWrapper>
