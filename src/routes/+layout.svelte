<script lang="ts">
    const routes = [
        { label: "Home", route: "/" },
        { label: "Monsters", route: "/monsters" },
        { label: "Players", route: "/players" },
        { label: "Parties", route: "/parties" },
        { label: "Encounters", route: "/encounters" },
    ];
</script>

<div class="container">
    <br>
    <header>
        <hgroup>
            <h1>D&D by Bear</h1>
            <p>Collection of somewhat useful tools</p>
        </hgroup>
    </header>

    <nav>
        <ul>
            {#each routes as r}
                <li><a href={r.route}>{r.label}</a></li>
            {/each}
        </ul>
    </nav>

    <main class="container">
        <slot/>
    </main>

</div>
