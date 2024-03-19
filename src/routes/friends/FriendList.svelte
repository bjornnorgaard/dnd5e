<script lang="ts">
    import { liveQuery } from "dexie";
    import { database } from "$lib/utils/database";

    let friends = liveQuery(
        () => database.friends.where("age").between(10,50).toArray()
    );

</script>
<ul>
    {#if $friends}
        {#each $friends as friend (friend.id)}
            <li>{friend.name}, {friend.age}</li>
        {/each}
    {/if}
</ul>
