<script lang="ts">
	import { invalidateAll, onNavigate } from "$app/navigation";
	import type { PageData } from "./$types";

	export let data: PageData;

	onNavigate(async () => {
		invalidateAll();
	});
</script>

<header>
	<h2>Подтверждение почты</h2>
</header>
<section>
	<span>{data.message}</span>
</section>

<style lang="scss">
	header {
		padding: 0 12px 0 12px;
		h2 {
			font: var(--H2);
			color: var(--text);
		}
	}
	section {
		display: flex;
		align-items: center;
		padding: 0 12px 0 12px;
		font: var(--B);
	}
</style>
