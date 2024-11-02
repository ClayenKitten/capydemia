<script lang="ts">
	import { page } from "$app/stores";
</script>

<div>
	<h1>{$page.status} {$page.error?.message}</h1>
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		height: 100%;
		h1 {
			margin: auto;
			font-size: 20px;
		}
	}
</style>
