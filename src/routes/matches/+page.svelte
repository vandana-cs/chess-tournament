
<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/Navbar.svelte';
    let tournaments = $state([]);
    let matches = $state([]);
    let tournament_id = $state("");

    async function loadData() {

        const t = await fetch("/api/tournaments");
        tournaments = await t.json();

        const m = await fetch("/api/matches");
        matches = await m.json();
    }

    async function generateMatches() {

        if (!tournament_id) {
            alert("Select Tournament");
            return;
        }

        await fetch("/api/matches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tournament_id: Number(tournament_id)
            })
        });

        await loadData();
    }
async function updateWinner(matchId, winnerId) {

    await fetch("/api/matches", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: matchId,
            winner_id: Number(winnerId)
        })

    });

    await loadData();

}
    onMount(loadData);
    
</script>
<Navbar />

<h1>Generate Matches</h1>


<div class="form">

    <select bind:value={tournament_id}>
        <option value="">Select Tournament</option>

        {#each tournaments as tournament}
            <option value={tournament.id}>
                {tournament.title}
            </option>
        {/each}
    </select>

    <button onclick={generateMatches}>
        Generate Matches
    </button>

</div>

<hr>

<h2>Matches</h2>

<table border="1">

<thead>
<tr>
<th>ID</th>
<th>Tournament</th>
<th>Player 1</th>
<th>Player 2</th>
<th>Winner</th>
</tr>
</thead>

<tbody>

{#each matches as match}

<tr>

<td>{match.id}</td>
<td>{match.title}</td>
<td>{match.player1}</td>
<td>{match.player2}</td>
<td>
    <select
        value={match.winner_id ?? ""}
        onchange={(e) => updateWinner(match.id, e.target.value)}
    >
        <option value="">Select Winner</option>

        <option value={match.player1_id}>
            {match.player1}
        </option>

        <option value={match.player2_id}>
            {match.player2}
        </option>

    </select>
</td>
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
width:800px;
}

th,td{
border:1px solid black;
padding:10px;
text-align:center;
}
</style>