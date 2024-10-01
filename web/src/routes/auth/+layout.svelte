<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="wrapper">
	<div class="content">
		<div class="logo">
			<img class="logo" src="/logo.svg" alt="" />
		</div>
		<div class="form">
			<slot />
		</div>
	</div>
	<footer>
		<img class="logo" src="/logo.svg" alt="" />
	</footer>
</div>

<style lang="scss">
	.wrapper {
		display: inline-flex;
		flex-direction: column;
		height: 100%;
		min-width: 100%;
	}
	.content {
		flex: 1;
		padding: 82px 0 188px 0;
		background-color: var(--base-bg);
		display: flex;
		flex-direction: column;
		gap: 32px;
		align-items: center;
		.logo {
			height: 94px;
			width: 100.52px;
		}
		.form {
			background-color: var(--main-bg);
			border: 1px solid var(--secondary);
			border-radius: 8px;
			width: 512px;
			padding: 40px 56px 40px 56px;
			--input-width: 400px;
			--paragraph-line: #d8d8d8;
			--paragraph-text: #666666;
		}
	}
	footer {
		flex: 0 0 178px;
		display: flex;
		align-items: center;
		background-color: var(--primary);
		padding: 0 82px;
		.logo {
			height: 106px;
			width: 106px;
			display: flex;
			justify-content: center;
			border: 6px solid var(--main-bg);
			border-radius: 100%;
			background-color: var(--main-bg);
		}
	}
</style>
