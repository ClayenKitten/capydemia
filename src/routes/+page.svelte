<script lang="ts">
	import api from "$lib/api";
	import { onMount } from "svelte";

	let time = "";
	onMount(async () => {
		time = (await api.time.get()).data!;
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<p>Current time: {time}</p>
