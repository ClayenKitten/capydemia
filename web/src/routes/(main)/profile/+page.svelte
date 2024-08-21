<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";
	import type { PageData } from "./$types";

	export let data: PageData;

	/*
	let email = "";
	let firstName = "";
	let lastName = "";
	let password = "";
	let repeat_password = "";
	let confirmed = false;

	$: valid_email = z.string().email().max(128).safeParse(email).success;
	$: validFirstName = firstName.length !== 0 && firstName.length <= 128;
	$: validLastName = lastName.length !== 0 && lastName.length <= 128;
	$: valid_password = password.length >= 8 && password.length <= 128;
	$: valid_repeat_password = password === repeat_password;
	$: valid =
		valid_email &&
		validFirstName &&
		validLastName &&
		valid_password &&
		valid_repeat_password;*/
	$: valid = true;
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
	<div class="inputs">
		<div class="input">
			<h4>Личные данные</h4>
			<div class="personal">
				<div class="personal_input">
					<Input placeholder="Введите имя" {valid} />
					<Input placeholder="Введите фамилию" {valid} />
					<Input placeholder="Введите отчество" {valid} />
				</div>
				<button class="photo">
					<img src="avatar.svg" alt="avatar" />
					<span>Сменить фото</span>
				</button>
			</div>
		</div>
		<div class="input">
			<h4>Контактная информация</h4>
			<div class="contacts">
				<Input placeholder="Введите почту" {valid} />
				<Input placeholder="Введите номер телефона" {valid} />
			</div>
		</div>
		<div class="input">
			<h4>Смена пароля</h4>
			<div class="password">
				<div class="old_password">
					<Input placeholder="Введите текущий пароль" />
				</div>
				<div class="new_password">
					<Input placeholder="Введите новый пароль" {valid} />
					<Input placeholder="Повторите новый пароль" {valid} />
				</div>
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
		flex: 0 1 900px;
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
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.input {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.personal {
		display: flex;
		gap: 32px;
		justify-content: center;
		.photo {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2px;
			border: none;
			background-color: var(--main-bg);
			img {
				height: 141px;
				border-radius: 100%;
				border: 1px solid var(--secondary);
				background-color: #ede7f6;
			}
			span {
				font: var(--P1-bold);
				color: var(--primary);
			}
		}
	}
	.personal_input {
		display: flex;
		flex-flow: wrap;
		row-gap: 18px;
		column-gap: 32px;
	}
	.contacts {
		display: flex;
		flex-flow: wrap;
		row-gap: 18px;
		column-gap: 32px;
	}
	.password {
		display: flex;
		flex-direction: column;
		gap: 18px;
		.new_password {
			display: flex;
			flex-flow: wrap;
			row-gap: 18px;
			column-gap: 32px;
		}
	}
	.confirm {
		display: flex;
		justify-content: right;
	}
</style>
