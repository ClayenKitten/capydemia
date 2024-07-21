<script lang="ts">
	function submit() {
		finish = true;
	}
	let password = "";
	let repeat_password = "";
	let finish = false;
</script>

<main>
	<h1>Create new password</h1>
	<div class="form">
		<div class="labels">
			<span>New password:</span>
			<span>Repeat password:</span>
		</div>
		<div class="input">
			<input type="password" bind:value={password} />
			<input type="password" bind:value={repeat_password} />
		</div>
	</div>
	<div>
		<button
			on:click={submit}
			disabled={password !== repeat_password || password == ""}
			>Change password.</button
		>
	</div>

	{#if finish}
		<p>
			Successfully changed password! Now go to the main page to start working.
		</p>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 5px;
		text-align: center;
		background-color: var(--main-bg);
		color: var(--text);
	}
	.labels {
		display: flex;
		flex-direction: column;
		text-align: right;
		gap: 5px;
	}
	span {
		height: 22px;
	}
	.input {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	input {
		height: 22px;
	}
	.form {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	h1 {
		color: var(--text-header);
		font-size: 50px;
		margin: 10px;
	}
	button {
		color: var(--button-text);
		background-color: var(--fill);
		width: fit-content;
		padding: 2px 7px;
		border: 3px solid var(--border);
		border-radius: 15px;
	}
</style>
