<script lang="ts">
	function create(){

	};
	let username = "";
	let contact = "";
</script>

<main>
	<h1>Fill in your profile.</h1>
	<label>
		<span> Username: </span>
		<input bind:value={username} />
	</label>
	<label>
		<span>Contact:</span>
		<input bind:value={contact} />
	</label>
	<button on:click={create}>Create account</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>