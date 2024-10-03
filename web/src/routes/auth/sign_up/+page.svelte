<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const signUpSchema = z.object({
		firstName: z
			.string()
			.min(1, "Это поле не должно быть пустым")
			.max(128, "Слишком длинное имя"),
		lastName: z
			.string()
			.min(1, "Это поле не должно быть пустым")
			.max(128, "Слишком длинная фамилия"),
		email: z
			.string()
			.email("Некорректный адрес электронной почты")
			.max(128, "Слишком длинный адрес"),
		password: z
			.string()
			.min(8, "Пароль должен содержать хотя бы 8 символов")
			.max(128, "Слишком длинный пароль"),
		repeat_password: z.string()
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(signUpSchema)),
		{
			SPA: true,
			validators: zod(signUpSchema),
			async onChange(event) {
				valid =
					(await validateForm()).valid &&
					$form.password === $form.repeat_password;
			}
		}
	);

	async function create() {
		await api($page).user.account.register.mutate({
			email: $form.email,
			firstName: $form.firstName,
			lastName: $form.lastName,
			password: $form.password
		});
		submitted = true;
	}

	function returning() {
		submitted = false;
	}

	let submitted = false;
	let valid = false;
</script>

<main>
	{#if submitted === false}
		<form use:enhance>
			<div class="header">
				<h4>Регистрация</h4>
			</div>
			<div class="form">
				<div class="inputs">
					<label class="input" for={undefined}>
						<span>Имя</span>
						<Input
							type="text"
							placeholder="Ваше имя"
							bind:value={$form.firstName}
							required
							invalid={$errors.firstName ? true : false}
						/>
						{#if $errors.firstName}<span class="error">{$errors.firstName}</span
							>{/if}
					</label>
					<label class="input" for={undefined}>
						<span>Фамилия</span>
						<Input
							type="text"
							placeholder="Ваша фамилия"
							bind:value={$form.lastName}
							required
							invalid={$errors.lastName ? true : false}
						/>
						{#if $errors.lastName}<span class="error">{$errors.lastName}</span
							>{/if}
					</label>
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
						<span>Пароль</span>
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
					<label class="input" for={undefined}>
						<span>Повторите пароль</span>
						<Input
							type="password"
							placeholder="Повторите  пароль"
							bind:value={$form.repeat_password}
							required
							invalid={$form.password !== $form.repeat_password ||
							$errors.password
								? true
								: false}
						/>
						{#if $form.password !== $form.repeat_password}<span class="error"
								>Пароли не совпадают</span
							>{/if}
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
					На адрес <span class="email">{$form.email}</span> было отправлено письмо
					с инструкцией по активации аккаунта.
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
	.submitted {
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
	.form {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 36px;
		.error {
			color: var(--error);
			font: var(--P2);
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
