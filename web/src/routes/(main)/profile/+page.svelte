<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<div class="heading">
		<h2>Данные аккаунта</h2>
		<span
			>Данные аккаунта обеспечивают идентификацию пользователя и используются
			для создания сертификатов, пройденных Вами курсов, а также позволяют нам
			связаться с Вами.</span
		>
	</div>
	<div class="input">
		<div class="personal">
			<h4>Личные данные</h4>
			<div class="personal_input">
				<Input placeholder="Введите имя" />
			</div>
		</div>
		<div class="contacts">
			<h4>Контактная информация</h4>
			<div class="contact_input">
				<Input placeholder="Введите имя" />
			</div>
		</div>
		<div class="password">
			<h4>Смена пароля</h4>
			<div class="password_input">
				<Input placeholder="Введите имя" />
			</div>
		</div>
	</div>
	<div class="confirm">
		<Button text="Подтвердить изменения" kind="primary" />
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.heading {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 0 12px 0 12px;
		color: var(--text);
		font: var(--P1);

		h2 {
			font: var(--H2);
		}
	}
	h4 {
		font: var(--H4);
		color: var(--text);
	}
	.input {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.personal {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
	}
	.contacts {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
	}
	.password {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
	}
	.confirm {
		display: flex;
		justify-content: right;
	}
</style>
