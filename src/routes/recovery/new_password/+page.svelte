<script lang="ts">
	function submit(){
        finish = "Successfully changed password! Now go to the main page to start working.";
	};
	let password = "";
    let password_prove = "";
    let finish = "";
</script>

<main>
	<h1>Create new password</h1>
	<label>
		<span>New password:</span>
		<input bind:value={password} />
	</label>
    <label>
		<span>Repeat password:</span>
		<input bind:value={password_prove} />
	</label>
	<button on:click={submit}>Change password.</button>
    <div>
		{@html finish}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>