<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";

	let name = "";
	let password = "";

	async function submit() {
		await api($page).auth.login.mutate({ name, password });
	}
</script>

<main>
	<h1>Welcome to Capidemia</h1>

	<div class="form">
		<div class="labels">
			<span>Username:</span>
			<span>Password: </span>
		</div>
		<div class="input">
			<input bind:value={name} />
			<input type="password" bind:value={password} />
		</div>
	</div>

	<a href="/auth/recovery/contacts">Forgot your password?</a>

	<div>
		<button on:click={submit}>Submit</button>
	</div>

	<div id="sign_up_offer">
		<span>New to Capydemia?</span>
		<a href="/auth/sign_up/new_user" class="button"> Sign up </a>
	</div>
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

	#sign_up_offer {
		margin: 5px;
	}
	.button,
	button {
		color: var(--button-text);
		background-color: var(--fill);
		width: fit-content;
		padding: 2px 7px;
		border: 3px solid var(--border);
		border-radius: 15px;
	}
</style>
