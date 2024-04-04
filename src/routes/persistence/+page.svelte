<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/constants/routes";
    import PageSection from "$lib/components/PageSection.svelte";
    import { persist } from "$lib/database/persistence";
    import { onMount } from "svelte";
    import { error } from "@sveltejs/kit";

    onMount(async () => {
        const persisted = await navigator.storage.persisted();
        console.log("Persisted", persisted);

        const estimate = await navigator.storage.estimate();
        console.log("Storage estimate", estimate);

        if (persisted) {
            await goto(routes.combat());
        }

        const permission = await navigator.permissions.query({ name: "persistent-storage" });
        console.log("Permission", permission);
        console.log("Permission state", permission.state);

        switch (permission.state) {
            case "denied":
                error(500, "Permission denied to persist data");
                break;
            case "granted":
                console.log("Permission granted to persist data");
                await goto(routes.combat());
                break;
            case "prompt":
                console.log("Permission wants prompt to persist data");
                break;
        }

    })

    const storageExplanation = "The browser may delete the database without " +
        "notifying you. It does this in case it needs to free up space for " +
        "other website’s data that was used more recently than this. " +
        "Actually, this is a good thing for most cases as the end-users may " +
        "not want everything to be stored forever on each site they visit. ";

    async function permissionGranted() {
        const storage = navigator.storage;
        if (!storage) {
            console.error("Storage API not available");
            return;
        }

        const success = await storage.persist();
        if (!success) {
            console.error("Failed to persist to browser storage", success);
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
