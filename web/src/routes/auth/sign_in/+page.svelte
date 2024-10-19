<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const signInSchema = z.object({
		password: z.string().min(1, "Пароль должен содержать хотя бы 1 символ"),
		email: z
			.string()
			.email("Некорректный адрес электронной почты")
			.max(128, "Слишком длинный адрес")
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(signInSchema)),
		{
			SPA: true,
			validators: zod(signInSchema),
			async onChange(event) {
				valid = (await validateForm()).valid;
			}
		}
	);

	async function submit() {
		let result = await api($page).user.session.login.mutate({
			email: $form.email,
			password: $form.password
		});
		if (result.ok) {
			goto("/");
		} else {
			error = "Неверный логин или пароль";
		}
		valid = (await validateForm()).valid;
	}

	let error = "";
	let valid = false;
</script>

<main>
	<form use:enhance>
		<div class="header">
			<h4>Вход в аккаунт</h4>
		</div>
		<div class="form">
			<div class="inputs">
				<label class="input" for={undefined}>
					<span>Email</span>
					<Input
						type="email"
						placeholder="Ваш email"
						bind:value={$form.email}
						required
						invalid={$errors.email ? true : false}
					/>
					{#if $errors.email}<span class="error">{$errors.email}</span>{/if}
				</label>
				<label class="input" for={undefined}>
					<div class="password_label">
						<span>Пароль</span>
						<a href="/auth/recovery">Забыли пароль?</a>
					</div>
					<Input
						type="password"
						placeholder="Ваш пароль"
						bind:value={$form.password}
						required
						invalid={$errors.password ? true : false}
					/>
					{#if $errors.password}<span class="error">{$errors.password}</span
						>{/if}
				</label>
			</div>
			<div class="submit">
				<Button
					text="Войти в аккаунт"
					kind="primary"
					on:click={submit}
					disabled={!valid}
				/>
				{#if error}
					<span class="error">{error}</span>
				{/if}
			</div>
		</div>
	</form>
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
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}
	.form {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 36px;
		.error {
			color: var(--error);
			font: var(--P2);
		}
		.submit {
			display: flex;
			flex-direction: column;
			text-align: center;
		}
	}
	.inputs {
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
</style>
