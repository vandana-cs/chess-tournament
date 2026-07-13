
<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/Navbar.svelte';
    let rankings = $state([]);

    async function loadRankings() {

        const res = await fetch("/api/rankings");
        rankings = await res.json();

    }

    onMount(loadRankings);
</script>


<Navbar />
<h1>🏆 Tournament Rankings</h1>

<table border="1">

<thead>

<tr>
<th>Rank</th>
<th>Player</th>
<th>Wins</th>
</tr>

</thead>

<tbody>

{#each rankings as player, index}

<tr>

<td>
    {#if index === 0}
        🥇
    {:else if index === 1}
        🥈
    {:else if index === 2}
        🥉
    {:else}
        {index + 1}
    {/if}
</td>

<td>{player.name}</td>

<td>{player.wins}</td>

</tr>

{/each}

</tbody>

</table>

<style>
table{
    border-collapse:collapse;
    width:400px;
}

th,td{
    border:1px solid black;
    padding:10px;
    text-align:center;
}
</style>