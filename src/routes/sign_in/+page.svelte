<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";

	let name = "";
	let password = "";

	async function submit(){
		await api($page).auth.login.mutate({ name, password});
	}

</script>

<main>
	<h1>Welcome to Capidemia</h1>
	<label>
		<span>Username:</span>
		<input bind:value={name} />
	</label>
	<label>
		<span>Password: </span>
		<input bind:value={password} />
	</label>
	<a href="/auth/recovery/contacts">Forgot your password?</a>
	<button on:click={submit}>Submit</button>
	<div>
		<label>
			<span>New to Capydemia?</span>
			<button on:click={() => goto("/auth/sign_up/new_user")}> Sign up </button>
		</label>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
