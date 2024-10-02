<script lang="ts">
	import type { PageData } from "./$types";
</script>

<main>
	<div class="header">
		<h4>Почта подтверждена</h4>
	</div>
	<div class="info">
		<span>
			Ваша электронная почта подтверждена! Пожалуйста, войдите в аккаунт, чтобы
			начать работу.
		</span>
		<a href="/auth/sign_in" class="button">
			<span>К странице входа</span>
		</a>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 1;
		align-items: center;
		color: var(--text);
	}
	h4 {
		color: var(--text);
		font: var(--H4);
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 28px;
		span {
			text-align: center;
			font: var(--P1);
		}
	}
	.button {
		height: 52px;
		padding: 14px 32px 14px 32px;
		border-radius: 8px;
		align-content: center;
		font: var(--B);
		color: var(--main-bg);
		background-color: var(--primary);
		border: none;
		text-decoration: none;
		text-align: center;

		&:hover {
			color: var(--text);
			background-color: var(--secondary);
		}

		&:focus {
			color: var(--main-bg);
			background-color: var(--primary);
		}

		&:disabled {
			color: var(--text-disabled);
			background-color: var(--text-note);
			cursor: not-allowed;
		}
	}
</style>
