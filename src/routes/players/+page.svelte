
<script>
    import { onMount } from 'svelte';
     import Navbar from '$lib/Navbar.svelte';

    let name = $state("");
let age = $state("");
let rating = $state("");

let players = $state([]);
let editId = $state(null);
    async function loadPlayers() {
    const res = await fetch("/api/players");
    const data = await res.json();

    console.log("Players:", data);

    players = data;

    console.log("Length after assignment:", players.length);
}

    async function addPlayer() {

    if (!name || !age || !rating) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch("/api/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age: Number(age),
            rating: Number(rating)
        })
    });


    if(response.ok){

        name="";
        age="";
        rating="";

        await loadPlayers();

    }
    else{

        console.log("Failed to add player");

    }
}
function editPlayer(player){

    editId = player.id;

    name = player.name;
    age = player.age;
    rating = player.rating;

}
async function updatePlayer(){

    await fetch("/api/players",{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            id:editId,
            name,
            age:Number(age),
            rating:Number(rating)

        })

    });


    editId = null;

    name="";
    age="";
    rating="";

    await loadPlayers();

}
async function deletePlayer(id){

    await fetch("/api/players",{

        method:"DELETE",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            id
        })

    });


    await loadPlayers();

}
onMount(() => {
    loadPlayers();
});

</script>

<Navbar />

<h1>Chess Tournament - Players</h1>


<div class="form">

    <input 
        placeholder="Name"
        bind:value={name}
    />


    <input 
        placeholder="Age"
        type="number"
        bind:value={age}
    />


    <input 
        placeholder="Rating"
        type="number"
        bind:value={rating}
    />


    <button onclick={editId ? updatePlayer : addPlayer}>
    {editId ? "Update Player" : "Add Player"}
</button>

</div>


<hr>

<h2>Players</h2>
<p>Total Players: {players.length}</p>

<ul>
    {#each players as player}
        <li>{player.name}</li>
    {/each}
</ul>
<table border="1">

    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Rating</th>
            <th>Action</th>
        </tr>
    </thead>

    <tbody>

        {#each players as player}

            <tr>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.rating}</td>

                <td>
                    <button onclick={() => editPlayer(player)}>
                        Edit
                    </button>

                    <button onclick={() => deletePlayer(player.id)}>
                        Delete
                    </button>
                </td>

            </tr>

        {/each}

    </tbody>

</table>


<style>

.form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    padding: 8px;
}

button {
    padding: 8px 15px;
    cursor: pointer;
}

table {
    border-collapse: collapse;
    width: 500px;
}

th, td {
    padding: 10px;
    text-align: center;
}

</style>