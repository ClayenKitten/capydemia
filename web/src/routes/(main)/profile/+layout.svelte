<script lang="ts">
	import Menu from "$lib/components/Menu.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="wrapper">
	<aside>
		<div class="user">
			<img src="/avatar.svg" alt="avatar" class="avatar" />
			<div class="identity">
				<span class="firstname">{data.user.firstName}</span>
				<span class="lastname">{data.user.lastName}</span>
				<p class="role">Студент</p>
			</div>
		</div>
		<nav>
			<Menu text="Данные аккаунта" path="/profile" img="/icons/User-24px.svg" />
			<Menu
				text="Мои курсы"
				path="/profile/courses"
				img="/icons/GraduationCap-24px.svg"
			/>
			<Menu
				text="Настройки уведомлений"
				path="/profile/notifications"
				img="/icons/Bell-24px.svg"
			/>
			<Menu
				text="Сертификаты"
				path="/profile/certificates"
				img="/icons/Certificate-24px.svg"
			/>
			<Menu
				text="Мои платежи"
				path="/profile/payments"
				img="/icons/CreditCard-24px.svg"
			/>
			<Menu
				text="Поддержка"
				path="/profile/support"
				img="/icons/Headset-24px.svg"
			/>
		</nav>
		<button class="exit">
			<img src="/icons/SignOut-32px.svg" alt="exit" />
			<span>Выйти</span>
		</button>
	</aside>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		gap: 40px;
		padding: 40px 82px 188px 82px;
		background-color: var(--base-bg);
	}
	aside {
		display: flex;
		flex-direction: column;
		flex: 0 0 336px;
		gap: 14px;
	}
	.user {
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
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
	nav {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px 0 32px 0;
	}
	.exit {
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
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px 20px 32px 20px;
		display: flex;
		flex-direction: column;
		flex: 0 1 900px;
		gap: 32px;
	}
</style>
