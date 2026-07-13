
<script>
    import { onMount } from 'svelte';
import Navbar from '$lib/Navbar.svelte';
    let players = $state([]);
    let tournaments = $state([]);
    let registrations = $state([]);

    let player_id = $state("");
    let tournament_id = $state("");

    async function loadData() {

        const p = await fetch("/api/players");
        players = await p.json();

        const t = await fetch("/api/tournaments");
        tournaments = await t.json();

        const r = await fetch("/api/tournament-players");
        registrations = await r.json();

    }

    async function registerPlayer() {

        if (!player_id || !tournament_id) {
            alert("Select Player and Tournament");
            return;
        }

        await fetch("/api/tournament-players", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                player_id: Number(player_id),
                tournament_id: Number(tournament_id)
            })

        });

        player_id = "";
        tournament_id = "";

        await loadData();

    }

    onMount(loadData);
</script>
<Navbar />

<h1>Player Registration</h1>

<div class="form">

    <select bind:value={player_id}>
        <option value="">Select Player</option>

        {#each players as player}
            <option value={player.id}>
                {player.name}
            </option>
        {/each}
    </select>

    <select bind:value={tournament_id}>
        <option value="">Select Tournament</option>

        {#each tournaments as tournament}
            <option value={tournament.id}>
                {tournament.title}
            </option>
        {/each}
    </select>

    <button onclick={registerPlayer}>
        Register
    </button>

</div>

<hr>

<h2>Registered Players</h2>

<table border="1">

<thead>

<tr>
<th>ID</th>
<th>Player</th>
<th>Tournament</th>
</tr>

</thead>

<tbody>

{#each registrations as r}

<tr>

<td>{r.id}</td>
<td>{r.name}</td>
<td>{r.title}</td>

</tr>

{/each}

</tbody>

</table>

<style>
.form{
display:flex;
gap:10px;
margin-bottom:20px;
}

select,button{
padding:8px;
}

table{
border-collapse:collapse;
width:600px;
}

th,td{
border:1px solid black;
padding:10px;
text-align:center;
}
</style>