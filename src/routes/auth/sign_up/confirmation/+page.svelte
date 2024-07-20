<script lang="ts">
	import { goto } from "$app/navigation";

	function confirm() {
		//goto("/main_page");
	}
</script>

<main>
	<h1>Confirm your contacts</h1>
	<p>Your contacts are successfully confirmed! Now go to the main page to start working.</p>
	<div>
		<button on:click={confirm}>To the main page!</button>
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

