<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Menu from "$lib/components/Menu.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	const exit = async () => {
		await api($page).user.session.logout.mutate();
		window.location.reload();
	};
</script>

<div class="profile">
	<aside>
		<div class="user">
			<img src={data.user.avatar} alt="" class="avatar" />
			<div class="identity">
				<div class="name">
					{data.user.firstName} <br />
					{data.user.lastName}
				</div>
				<div class="role">Студент</div>
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
		<button class="exit" on:click={exit}>
			<img src="/icons/SignOut-32px.svg" alt="exit" />
			<span>Выйти</span>
		</button>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.profile {
		display: flex;
		gap: 40px;
		padding: 40px 0;
		justify-content: center;
	}
	aside {
		flex: 0 0 336px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		.user {
			background-color: var(--main-bg);
			border: 1px solid var(--secondary);
			border-radius: 8px;

			display: flex;
			align-items: center;
			gap: 16px;
			padding: 28px 32px;

			img {
				width: 102px;
				height: 102px;
				border-radius: 100%;
				background-color: #ede7f6;
			}

			.identity {
				display: flex;
				flex-direction: column;
				gap: 8px;

				.name {
					font: var(--P2-bold);
					color: var(--text);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.role {
					font: var(--P3-light);
					color: var(--text);
				}
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
			color: var(--primary);
		}
	}
	main {
		flex: 1 0 600px;
		max-width: 900px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 32px 20px 32px 20px;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
	}
</style>
