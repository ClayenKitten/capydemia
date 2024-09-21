<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	async function submit() {
		let result = await api($page).user.session.login.mutate({
			email,
			password
		});
		if (result.ok) {
			goto("/");
		} else {
			error = "Неверный логин или пароль";
		}
	}

	let email = "";
	let password = "";
	let error = "";

	$: valid_email = z.string().email().max(128).safeParse(email).success;
	$: valid = valid_email;
</script>

<main>
	<div class="form">
		<div class="header">
			<h4>Вход в аккаунт</h4>
		</div>
		<div class="inputs">
			<div class="type">
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
					<div class="password_label">
						<span>Пароль</span>
						<a href="/auth/recovery">Забыли пароль?</a>
					</div>
					<Input
						type="password"
						placeholder="Ваш пароль"
						bind:value={password}
						required
					/>
				</label>
			</div>
			<Button
				text="Войти в аккаунт"
				kind="primary"
				on:click={submit}
				disabled={password == "" || !valid}
			/>
			{#if error}
				<span class="error">{error}</span>
			{/if}
		</div>
	</div>
	<hr class="sign_up_offer" />
	<a href="/auth/sign_up" class="button">
		<span>Создать аккаунт</span>
	</a>
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
	.form {
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
	.password_label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		a {
			color: var(--primary);
			font: var(--P3-light);
			text-decoration: none;
			&:hover {
				color: var(--secondary);
			}
			&:focus {
				color: var(--primary);
			}
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
			content: "Ещё нет аккаунта?";
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
		color: var(--primary);
		background-color: var(--main-bg);
		border: 1px solid var(--primary);
		text-decoration: none;
		text-align: center;

		&:hover {
			color: var(--secondary);
			border-color: var(--secondary);
		}

		&:focus {
			color: var(--primary);
			border-color: var(--primary);
		}

		&:disabled {
			color: var(--text-note);
			border-color: var(--text-note);
			cursor: not-allowed;
		}
	}
	.error {
		color: var(--error);
	}
</style>
