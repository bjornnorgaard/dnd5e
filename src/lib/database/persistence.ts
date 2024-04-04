import { browser } from "$app/environment";

/** Check if storage is persisted already.
 @returns {Promise<boolean>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
 */
export async function isStoragePersisted(): Promise<boolean> {
    if (!browser) {
        console.log("Browser API not available");
        return false;
    }

    const storage: StorageManager = navigator.storage;
    if (!storage) {
        console.log("Storage API not available");
        return false;
    }

    return await storage.persisted();
}

/** Tries to convert to persisted storage.
 @returns {Promise<boolean>} Promise resolved with true if successfully
  persisted the storage, false if not, and undefined if the API is not present.
 */
export async function persist(): Promise<boolean> {
    if (!browser) {
        console.log("Browser API not available");
        return false;
    }

    const storage: StorageManager = navigator.storage;
    if (!storage) {
        console.log("Storage API not available");
        return false;
    }

    const persisted = await storage.persisted();
    if (persisted) {
        console.log("Storage already persisted");
        return true;
    }

    const success = await storage.persist();
    if (!success) {
        console.log("Failed to persist storage");
    }

    return success;
}

/** Queries available disk quota.
 @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEstimate
 @returns {Promise<StorageEstimate | boolean>} Promise resolved with
  {quota: number, usage: number} or undefined.
 */
export async function showEstimatedQuota(): Promise<StorageEstimate | boolean> {
    if (!browser) {
        console.log("Browser API not available");
        return false;
    }

    const storage: StorageManager = navigator.storage;
    if (!storage) {
        console.log("Storage API not available");
        return false;
    }

    if (!storage.estimate) {
        console.log("Storage estimate not available");
        return false;
    }

    return await storage.estimate();
}

/** Tries to persist storage without ever prompting user.
 @returns {Promise<string>}
 "never" In case persisting is not ever possible. Caller don't bother
 asking user for permission.
 "prompt" In case persisting would be possible if prompting user first.
 "persisted" In case this call successfully silently persisted the storage,
 or if it was already persisted.
 */
export async function tryPersistWithoutPromptingUser(): Promise<string> {
    if (!browser) {
        return "Not in browser context";
    }

    const storage = navigator.storage;
    if (!storage) {
        return "Storage API not available";
    }

    let persisted = await storage.persisted();
    if (persisted) {
        return "persisted";
    }

    if (!navigator.permissions || !navigator.permissions.query) {
        return "prompt"; // It MAY be successful to prompt. Don't know.
    }

    const permission = await navigator.permissions.query({ name: "persistent-storage" });
    if (permission.state === "granted") {
        persisted = await storage.persist();
        if (persisted) return "persisted";
        throw new Error("Failed to persist");
    }
    if (permission.state === "prompt") {
        return "prompt";
    }

    return "never";
}
