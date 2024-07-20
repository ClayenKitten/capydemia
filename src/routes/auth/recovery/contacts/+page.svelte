<script lang="ts">
	import { goto } from "$app/navigation";
	
	function submit(){
		//goto('/auth/recovery/new_password');
		confirmed = true;
	}

	let username = "";
	let code_prove = "";
	let code ="";
	let confirmed = false;
</script>

<main>
	<h1>Forgot your password?</h1>
    <p>Enter your email address to recover access to your account.</p>
	<label>
		<span>Contact:</span>
		<input bind:value={username} />
	</label>
	<div>
		<button on:click={submit}>Submit</button>
	</div>
	<div id="prove">
		{#if confirmed}
			<p>We will send you an email with the link. Follow to change your password.</p>
		{/if}
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
	span{
		height:22px;
	}
	input{
		height:22px;
	}
	h1{
		color:aquamarine;
		font-size: 50px;
		margin:10px;
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