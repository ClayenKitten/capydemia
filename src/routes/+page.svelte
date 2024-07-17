<script lang="ts">
/*
	import api from "$lib/api";
	import { onMount } from "svelte";

	let time = "";
	onMount(async () => {
		time = (await api.time.get()).data!;
	});
*/

	function handleClick(){

	};

	function signUp(){

	};

	let username = "";
	let password = "";
</script>

<div>
	<h1>Welcome to Capidemia</h1>
	<label>Username: </label>
	<input bind:value={username} /> <br>
	<label>Password: </label>
	<input bind:value={password} /> <br>
	<a href="/recovery">Forgot your password?</a> <br>
	<button on:click={handleClick}>Submit</button> <br>
	<label>New to Capydemia?</label>
	<button on:click={signUp}>Sign up</button>
</div>

