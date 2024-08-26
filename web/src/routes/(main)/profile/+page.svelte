<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";
	import type { PageData } from "./$types";

	export let data: PageData;

	const change_info = async () => {
		await api($page).user.profile.changeInfo.mutate({
			firstName: data.user.firstName,
			lastName: data.user.lastName,
			patronim: data.user.patronim
		});
		await api($page).user.profile.changePassword.mutate({
			newPassword: newPassword,
			oldPassword: oldPassword
		});
		await api($page).user.profile.requestEmailChange.mutate({
			newEmail: data.user.email
		});
		await api($page).user.profile.changeAvatar.mutate({
			newUrl: data.user.avatar
		});
		//window.location.reload();
	};

	let oldPassword = "";
	let newPassword = "";
	let repeatPassword = "";

	$: validEmail = z
		.string()
		.email()
		.max(128)
		.safeParse(data.user.email).success;
	$: validFirstName =
		data.user.firstName.length !== 0 && data.user.firstName.length <= 128;
	$: validLastName =
		data.user.lastName.length !== 0 && data.user.lastName.length <= 128;
	$: validPatronim = true;
	//data.user.patronim.length !== 0 && data.user.patronim.length <= 128;

	$: validOldPassword = true;

	$: validNewPassword = newPassword.length >= 8 && newPassword.length <= 128;
	$: validRepeatPassword = newPassword === repeatPassword;

	$: valid =
		validEmail &&
		validFirstName &&
		validLastName &&
		//validPatronim &&
		validOldPassword &&
		validNewPassword &&
		validRepeatPassword;
	/*
	let confirmed = false;
*/
</script>

<header>
	<h2>Данные аккаунта</h2>
	<span
		>Данные аккаунта обеспечивают идентификацию пользователя и используются для
		создания сертификатов, пройденных Вами курсов, а также позволяют нам
		связаться с Вами.</span
	>
</header>
<section class="inputs">
	<div class="input">
		<h4>Личные данные</h4>
		<div class="personal">
			<div class="personal_input">
				<Input
					placeholder="Введите имя"
					bind:input={data.user.firstName}
					valid={validFirstName}
				/>
				<Input
					placeholder="Введите фамилию"
					bind:input={data.user.lastName}
					valid={validLastName}
				/>
				<Input
					placeholder="Введите отчество"
					bind:input={data.user.patronim}
					valid={validPatronim}
				/>
			</div>
			<button class="photo">
				<img src={data.user.avatar} alt="Фото" />
				<span>Сменить фото</span>
			</button>
		</div>
	</div>
	<div class="input">
		<h4>Контактная информация</h4>
		<div class="contacts">
			<Input
				placeholder="Введите почту"
				bind:input={data.user.email}
				valid={validEmail}
			/>

			<!--- TODO: may be implemented later -->
			<!--- <Input placeholder="Введите номер телефона" {valid} /> -->
		</div>
	</div>
	<div class="input">
		<h4>Смена пароля</h4>
		<div class="password">
			<div class="old_password">
				<Input
					placeholder="Введите текущий пароль"
					bind:input={oldPassword}
					valid={validOldPassword}
				/>
			</div>
			<div class="new_password">
				<Input
					placeholder="Введите новый пароль"
					bind:input={newPassword}
					valid={validNewPassword}
				/>
				<Input
					placeholder="Повторите новый пароль"
					bind:input={repeatPassword}
					valid={validRepeatPassword}
				/>
			</div>
		</div>
	</div>
</section>
<div class="confirm">
	<Button
		text="Подтвердить изменения"
		kind="primary"
		on:click={change_info}
		disabled={!valid}
	/>
</div>

<style lang="scss">
	header {
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
				width: 141px;
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
