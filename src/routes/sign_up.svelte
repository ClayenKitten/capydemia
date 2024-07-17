<script lang="ts">
	function create(){

	};
	let username = "";
	let contact = "";
</script>

<div>
	<h1>Fill in your profile.</h1>
	<label>Username: </label>
	<input bind:value={username} /> <br>
	<label>Contact: </label>
	<input bind:value={contact} /> <br>
	<button on:click={create}>Create account</button> <br>
</div>

