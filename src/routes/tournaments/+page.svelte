
<script>
    import { onMount } from 'svelte';
import Navbar from '$lib/Navbar.svelte';
    let title = $state("");
let location = $state("");
let tournament_date = $state("");

let tournaments = $state([]);
let editId = $state(null);

 async function loadTournaments() {
    console.log("Loading tournaments...");

    const res = await fetch("/api/tournaments");

    const data = await res.json();

    console.log("Fetched:", data);

    tournaments = data;

    console.log("Assigned tournaments:", tournaments);
}

   async function addTournament() {

    console.log("Button clicked");

    if (!title || !location || !tournament_date) {
        alert("Fill all fields");
        return;
    }

    const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            location,
            tournament_date
        })
    });

    console.log("Status:", response.status);

    const data = await response.text();
    console.log("Response:", data);

    await loadTournaments();
}

    function editTournament(tournament) {

        editId = tournament.id;
        title = tournament.title;
        location = tournament.location;
        tournament_date = tournament.tournament_date.substring(0,10);

    }

    async function updateTournament() {

        await fetch("/api/tournaments", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: editId,
                title,
                location,
                tournament_date
            })

        });

        editId = null;

        title = "";
        location = "";
        tournament_date = "";

        await loadTournaments();

    }

    async function deleteTournament(id) {

        await fetch("/api/tournaments", {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id
            })

        });

        await loadTournaments();

    }

    onMount(async () => {
    console.log("onMount called");
    await loadTournaments();
});

</script>
<Navbar />

<h1>Chess Tournament - Tournaments</h1>

<div class="form">

    <input
        placeholder="Tournament Title"
        bind:value={title}
    >

    <input
        placeholder="Location"
        bind:value={location}
    >

    <input
        type="date"
        bind:value={tournament_date}
    >

   <button on:click={editId ? updateTournament : addTournament}>
    {editId ? "Update Tournament" : "Add Tournament"}
</button>

</div>

<hr>

<h2>Tournaments</h2>

<p>Total Tournaments: {tournaments.length}</p>

<ul>
    {#each tournaments as tournament}
        <li>{tournament.title}</li>
    {/each}
</ul>
<table border="1">

<thead>

<tr>

<th>ID</th>
<th>Title</th>
<th>Location</th>
<th>Date</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{#each tournaments as tournament}

<tr>

<td>{tournament.id}</td>

<td>{tournament.title}</td>

<td>{tournament.location}</td>

<td>{tournament.tournament_date.substring(0,10)}</td>

<td>

<button on:click={() => editTournament(tournament)}>
    Edit
</button>

<button on:click={() => deleteTournament(tournament.id)}>
    Delete
</button>

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

input{
    padding:8px;
}

button{
    padding:8px 15px;
    cursor:pointer;
}

table{
    border-collapse:collapse;
    width:700px;
}

th,td{
    border:1px solid black;
    padding:10px;
    text-align:center;
}

</style>