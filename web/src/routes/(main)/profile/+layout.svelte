<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<div class="user">
		<img src="/avatar.svg" alt="avatar" class="avatar" />
		<div class="identity">
			<span class="name">Котофий Пушистовый</span>
			<p class="role">Студент</p>
		</div>
	</div>
	<div class="menu">
		<div>Данные аккаунта</div>
	</div>
	<div class="exit">
		<img src="/icons/SignOut-32px.svg" alt="exit" />
		<span>Выйти</span>
	</div>
	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 336px 900px;
		grid-template-rows: min-content 158px auto;
		grid-template-areas:
			"user content"
			"menu content"
			"exit content";
		gap: 14px 40px;
		padding: 40px calc((max(100vw - 1276px, 0px)) / 2 + 64px);
		background-color: var(--base-bg);
	}
	.user {
		grid-area: user;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;

		display: flex;
		align-items: center;
		gap: 16px;
		padding: 28px 32px 28px 32px;

		img {
			height: 102px;
			border-radius: 100%;
			background-color: #ede7f6;
		}
		span {
			font: var(--P2-bold);
			color: var(--text);
		}
		p {
			font: var(--P3-light);
			color: var(--text);
		}

		.identity {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}
	.menu {
		grid-area: menu;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
	}
	.exit {
		grid-area: exit;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;

		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 32px 16px 32px;
		font: var(--B);
	}
	.content {
		grid-area: content;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px 20px 32px 20px;
	}
</style>
