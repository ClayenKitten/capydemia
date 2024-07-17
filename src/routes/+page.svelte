<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import { onMount } from "svelte";

	let time = "";
	onMount(async () => {
		time = await api($page).getTime.query();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<p>Current time: {time}</p>
