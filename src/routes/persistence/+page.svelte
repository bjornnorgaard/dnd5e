<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/constants/routes";
    import PageSection from "$lib/components/PageSection.svelte";
    import { persist, showEstimatedQuota } from "$lib/database/persistence";
    import { onMount } from "svelte";

    onMount(async () => {
        await showEstimatedQuota();
    })

    const storageExplanation = "The browser may delete the database without " +
        "notifying you. It does this in case it needs to free up space for " +
        "other website’s data that was used more recently than this. " +
        "Actually, this is a good thing for most cases as the end-users may " +
        "not want everything to be stored forever on each site they visit. ";

    async function permissionGranted() {
        const res = await persist()
        if (!res) {
            console.error("Failed to persist to browser storage");
            return;
        }
        await goto(routes.combat());
    }
</script>

<PageWrapper title="Permissions" desc="The app needs some permissions in order to work">
    <PageSection title="Can we save data?" desc={storageExplanation}>
        <div class="text-center">
            <button class="btn variant-filled-primary" on:click={async () => await permissionGranted()}>Grant Permission</button>
        </div>
    </PageSection>
</PageWrapper>
