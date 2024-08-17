<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<div class="content">
		<div class="logo">Logo</div>
		<div class="form">
			<h1>Подтверждение почты</h1>
			<span>{data.message}</span>
			<a href="/" class="button">На главную</a>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 16px;
		background-color: var(--main-bg);
		color: var(--text);
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}
	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 48px;
		border: 1px solid var(--border);
		border-radius: 24px;
		padding: 40px 56px 40px 56px;
	}
	h1 {
		color: var(--text-header);
		font-size: 32px;
		margin: 10px;
	}
	.button {
		height: 64px;
		color: var(--button-text);
		background-color: var(--fill);
		padding: 2px 7px;
		border: 2px solid var(--fill);
		border-radius: 40px;
		align-self: stretch;
		font-size: 22px;
		align-content: center;
		text-decoration: none;

		&:hover {
			border: 2px solid var(--fill-hover);
			background-color: var(--fill-hover);
		}

		&:disabled {
			background-color: var(--border);
			border-color: var(--border);
		}
	}
</style>
