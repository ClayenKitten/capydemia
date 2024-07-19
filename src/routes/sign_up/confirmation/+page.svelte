<script lang="ts">
	import { goto } from "$app/navigation";

	function confirm() {
		finish = "<p>Successfully confirmed!</p><p>Now go to the main page to start working.</p>";
	}
	let finish = "";
</script>

<main>
	<h1>Confirm your contacts</h1>
	<button on:click={confirm}>OK.</button>
	<div>
		{@html finish}
	</div>
</main>
