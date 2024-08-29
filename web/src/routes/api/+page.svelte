<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	onMount(() => document.write(data.content));
</script>

Loading...
