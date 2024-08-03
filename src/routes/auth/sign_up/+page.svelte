<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import { z } from "zod";

	async function create() {
		await api($page).user.registration.begin.mutate({ email, password });
		//await goto("/auth/sign_in");
		confirmed = true;
	}

	let email = "";
	let password = "";
	let repeat_password = "";
	let confirmed = false;

	$: valid_email = z.string().email().max(128).safeParse(email).success;
	$: valid_password = password.length >= 8 && password.length <= 128;
	$: valid_repeat_password =
		repeat_password.length >= 8 && repeat_password.length <= 128;
	$: valid = valid_email && valid_password && valid_repeat_password;
</script>

<main>
	<div class="content">
		{#if !confirmed}
			<div class="logo">Logo</div>
			<div class="form">
				<h1>Регистрация</h1>
				<div class="input">
					<label class="type">
						<span>Email</span>
						<input
							type="email"
							bind:value={email}
							class:invalid={!valid_email}
						/>
					</label>
					<label class="type">
						<span>Пароль</span>
						<input
							type="password"
							bind:value={password}
							class:invalid={!valid_password}
						/>
					</label>
					<label class="type">
						<span>Повторите пароль</span>
						<input
							type="password"
							bind:value={repeat_password}
							class:invalid={!valid_repeat_password}
						/>
					</label>
					<button
						on:click={create}
						disabled={password !== repeat_password ||
							password == "" ||
							email == "" ||
							!valid}
					>
						Зарегистрироваться
					</button>
				</div>
			</div>

			<div class="sign_up_offer">
				<span>Уже есть аккаунт?</span>
			</div>

			<a href="/auth/sign_in" class="button">Войти</a>
		{:else}
			<p>
				На указанную почту будет отправлено письмо со ссылкой для подтверждения
				контактов. Проверьте свой почтовый ящик!
			</p>
		{/if}
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
	.input {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 24px;
	}
	.type {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		gap: 4px;
	}
	h1 {
		color: var(--text-header);
		font-size: 32px;
		margin: 10px;
	}
	input {
		height: 56px;
		width: 528px;
		border: 2px solid var(--border);
		border-radius: 12px;
		font-size: 20px;
		padding: 0 10px 0 10px;
	}
	.invalid {
		border-color: var(--error);
	}
	.sign_up_offer {
		margin: 5px;
		font-size: 20px;
	}
	.button,
	button {
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
	.button {
		color: var(--button-text--secondary);
		background-color: var(--fill-secondary);
		border: 2px solid var(--border-secondary);

		&:hover {
			border: 2px solid var(--border-secondary-hover);
			background-color: var(--fill-secondary);
			color: var(--button-text-hover);
		}

		&:disabled {
			background-color: var(--text-note);
			border-color: var(--text-note);
		}
	}
</style>
