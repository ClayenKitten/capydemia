<script lang="ts">
	import { goto } from "$app/navigation";
	function sendCode(){
		code_prove = "<label><span>Enter code:</span><input bind:value={code} /></label><button on:click={submit}>Submit.</button>";
	};
	function submit(){
		() => goto('/auth/recovery/new_password');
	}
	let username = "";
	let code_prove = "";
	let code ="";
</script>

<main>
	<h1>Forgot your password?</h1>
    <p>Enter your telephone number or email address to recover access to your account.</p>
	<label>
		<span>Contact:</span>
		<input bind:value={username} />
	</label>
	<button on:click={sendCode}>Send code.</button>
	<div id="prove">
		{@html code_prove}
	</div>
</main>

