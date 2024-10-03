<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";
	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const recoverySchema = z.object({
		email: z
			.string()
			.email("Некорректный адрес электронной почты")
			.max(128, "Слишком длинный адрес")
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(recoverySchema)),
		{
			SPA: true,
			validators: zod(recoverySchema),
			async onChange(event) {
				valid = (await validateForm()).valid;
			}
		}
	);

	async function submit() {
		await api($page).user.account.recover.mutate({ email: $form.email });
		confirmed = true;
	}

	let confirmed = false;
	let valid = false;
</script>

<main>
	{#if confirmed === false}
		<div class="header">
			<h4>Восстановление пароля</h4>
		</div>
		<form use:enhance>
			<div class="inputs">
				<label class="input" for={undefined}>
					<span>Email</span>
					<Input
						type="email"
						placeholder="Email, к которому привязан ваш аккаунт"
						bind:value={$form.email}
						required
						invalid={$errors.email ? true : false}
					/>
					{#if $errors.email}<span class="error">{$errors.email}</span>{/if}
				</label>
			</div>
			<div class="buttons">
				<a href="/auth/sign_in" class="button_text">
					<img
						src="/icons/Arrow.svg"
						alt="button"
						class="arrow"
						style="transform:scale(-1, 1);"
					/>
					<span>Назад</span>
				</a>
				<Button
					text="Продолжить"
					kind="primary"
					on:click={submit}
					disabled={!valid}
				/>
			</div>
		</form>
	{:else}
		<div class="submitted">
			<div class="header">
				<h4>Восстановление пароля</h4>
			</div>
			<div class="info">
				<span>
					Мы отправили письмо с инструкциями по смене пароля на указанный Вами
					email.
				</span>
				<a href="/auth/sign_in" class="button_primary">
					<span>К странице входа</span>
				</a>
			</div>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 24px;
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
		gap: 20px;
		.info {
			display: flex;
			flex-direction: column;
			gap: 28px;
			span {
				text-align: center;
				font: var(--P1);
			}
		}
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 36px;
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
		.error {
			color: var(--error);
			font: var(--P2);
		}
	}
	.buttons {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.button_text {
		height: 52px;
		padding: 14px 32px 14px 32px;
		border-radius: 8px;
		align-content: center;
		font: var(--B);
		display: flex;
		align-items: center;
		gap: 10px;
		height: 24px;
		padding: 4px 0 4px 0;
		color: var(--primary);
		background-color: var(--main-bg);
		border: none;
		text-decoration: none;
		text-align: center;

		img {
			filter: invert(25%) sepia(60%) saturate(2103%) hue-rotate(179deg)
				brightness(99%) contrast(94%);
		}

		&:hover {
			color: var(--secondary);
			fill: var(--secondary);
			img {
				filter: invert(77%) sepia(39%) saturate(283%) hue-rotate(161deg)
					brightness(100%) contrast(90%);
			}
		}

		&:focus {
			color: var(--primary);
			img {
				filter: invert(25%) sepia(60%) saturate(2103%) hue-rotate(179deg)
					brightness(99%) contrast(94%);
			}
		}

		&:disabled {
			color: var(--text-note);
			cursor: not-allowed;
			img {
				filter: invert(82%) sepia(8%) saturate(41%) hue-rotate(316deg)
					brightness(87%) contrast(98%);
			}
		}
	}
	.button_primary {
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
