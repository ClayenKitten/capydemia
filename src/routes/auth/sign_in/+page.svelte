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

	<div id="form">
		<div id="labels">
			<span>Username:</span>
			<span>Password: </span>
		</div>
		<div id="input">
			<input bind:value={name} />
			<input bind:value={password} />
		</div>
	</div>

	<a href="/auth/recovery/contacts">Forgot your password?</a>

	<div id="submit">
		<button on:click={submit}>Submit</button>
	</div>
	
	<div id="sign_up_offer">
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
		flex:1;
		gap:5px;
		text-align: center;
		background-color: black;
		color:aliceblue;
	}
	#labels{
		display: flex;
		flex-direction: column;
		text-align: right;
		gap:5px;
	}
	span{
		height:22px;
	}
	#input{
		display: flex;
		flex-direction: column;
		gap:5px;
	}
	input{
		height:22px;
	}
	#form{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	h1{
		color:aquamarine;
		font-size: 50px;
		margin:10px;
	}

	#sign_up_offer{
		color: white;
		margin:5px;
	}
	button{
		color:black;
		background-color: aquamarine;
		width: fit-content;
		padding: 2px 7px;
		border: 3px solid white;
  		border-radius: 15px;
	}
</style>
