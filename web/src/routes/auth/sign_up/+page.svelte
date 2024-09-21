<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	async function create() {
		await api($page).user.account.register.mutate({
			email,
			firstName,
			lastName,
			password
		});
		confirmed = true;
	}

	function returning() {
		submitted = false;
	}

	let submitted = false;

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
		valid_repeat_password;
</script>

<main>
	{#if submitted === false}
		<form>
			<div class="header">
				<h4>Регистрация</h4>
			</div>
			<div class="inputs">
				<div class="type">
					<label class="input" for={undefined}>
						<span>Имя</span>
						<Input
							type="text"
							placeholder="Ваше имя"
							bind:value={firstName}
							required
							maxlength={128}
						/>
					</label>
					<label class="input" for={undefined}>
						<span>Фамилия</span>
						<Input
							type="text"
							placeholder="Ваша фамилия"
							bind:value={lastName}
							required
							maxlength={128}
						/>
					</label>
					<label class="input" for={undefined}>
						<span>Email</span>
						<Input
							type="email"
							placeholder="Ваш email"
							bind:value={email}
							required
						/>
					</label>
					<label class="input" for={undefined}>
						<span>Пароль</span>
						<Input
							type="password"
							placeholder="Ваш пароль"
							bind:value={password}
							required
							minlength={8}
							maxlength={128}
						/>
					</label>
					<label class="input" for={undefined}>
						<span>Повторите пароль</span>
						<Input
							type="password"
							placeholder="Повторите  пароль"
							bind:value={repeat_password}
							required
							minlength={8}
							maxlength={128}
						/>
					</label>
				</div>
				<Button
					text="Зарегистрироваться"
					kind="primary"
					on:click={create}
					disabled={!valid}
				/>
			</div>
		</form>
		<hr class="sign_up_offer" />
		<a href="/auth/sign_in" class="button">
			<span>Войти в аккаунт</span>
		</a>
	{:else}
		<div class="submitted">
			<div class="header">
				<h4>Регистрация</h4>
			</div>
			<div class="finish">
				<span class="info">
					На адрес <span class="email">{email}</span> было отправлено письмо с инструкцией
					по активации аккаунта.
				</span>
				<a href="/auth/sign_in" class="button">
					<span>К странице входа</span>
				</a>
			</div>
			<Button
				text="Сменить адрес электронной почты"
				kind="text-left"
				on:click={returning}
			/>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 43px;
		flex: 1;
		align-items: center;
		color: var(--text);
	}
	h4 {
		color: var(--text);
		font: var(--H4);
	}
	.submited {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		.finish {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 28px;
			.info {
				text-align: center;
				.email {
					color: var(--primary);
				}
			}
		}
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 36px;
	}
	.type {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.input {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		gap: 2px;
		span {
			font: var(--P2);
			color: var(--text);
		}
	}
	.sign_up_offer {
		width: 100%;
		text-align: center;
		font: var(--P1);
		color: var(--paragraph-text);

		border: none;
		border-top: 2px solid var(--paragraph-line);
		overflow: visible;
		height: 0px;

		&::after {
			content: "Уже есть аккаунт?";
			background: var(--main-bg);
			padding: 1px 23px;
			position: relative;
			top: -13px;
		}
	}
	.button {
		width: 100%;
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
