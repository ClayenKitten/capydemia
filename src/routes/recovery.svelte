<script lang="ts">
	function sendCode(){

	};
	let username = "";
	//let password = "";
</script>

<div>
	<h1>Forgot your password?</h1>
    <p>Enter your telephone number or email address to recover access to your account.</p>
	<label>Contact: </label>
	<input bind:value={username} /> <br>
	<button on:click={sendCode}>Send code.</button> <br>
</div>

