<script>
    import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />

<div class="container">
    <h1>♟ Chess Tournament Management System</h1>

    <p>
        Manage players, tournaments, registrations, matches, and rankings.
    </p>

    <div class="menu">
        <a href="/players">Player Management</a>
        <a href="/tournaments">Tournament Management</a>
        <a href="/registration">Tournament Registration</a>
        <a href="/matches">Generate Matches</a>
        <a href="/rankings">Rankings</a>
    </div>
</div>

<style>
.container {
    text-align: center;
    margin-top: 50px;
}

.menu {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}

.menu a {
    padding: 12px 20px;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.menu a:hover {
    background: #555;
}
</style>