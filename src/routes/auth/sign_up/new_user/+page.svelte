<script lang="ts">
	import { goto } from "$app/navigation";

	function create(){
		goto("/main_page");
	};
	let username = "";
	let contact = "";
	let password = "";
	let repeat_password = "";
</script>

<main>
	<h1>Fill in your profile.</h1>
	<div id="form">
		<div id="labels">
			<span> Username: </span>
			<span>Contact:</span>
			<span>Password:</span>
			<span>Repeat password:</span>
		</div>
		<div id="input">
			<input bind:value={username} />
			<input bind:value={contact} />
			<input bind:value={password} />
			<input bind:value={repeat_password} />
		</div>
	</div>
	<div>
		<button on:click={create}>Create account</button>
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
	button{
		color:black;
		background-color: aquamarine;
		width: fit-content;
		padding: 2px 7px;
		border: 3px solid white;
  		border-radius: 15px;
		margin:5px;
	}
</style>