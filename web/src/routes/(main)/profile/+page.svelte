<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h5>Данные аккаунта</h5>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	h5 {
		font: var(--H2);
		color: var(--text);
	}
</style>
