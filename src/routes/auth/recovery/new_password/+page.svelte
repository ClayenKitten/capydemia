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
	<div id="form">
		<div id="labels">
			<span>New password:</span>
			<span>Repeat password:</span>
		</div>
		<div id="input">
			<input bind:value={password} />
			<input bind:value={password_prove} />
		</div>
	</div>
	<div>
		<button on:click={submit}>Change password.</button>
	</div>
	
    <div>
		{@html finish}
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
	}
</style>