<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";
	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { goto } from "$app/navigation";

	const newPasswordSchema = z.object({
		password: z
			.string()
			.min(8, "Пароль должен содержать хотя бы 8 символов")
			.max(128, "Слишком длинный пароль"),
		repeat_password: z.string()
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(newPasswordSchema)),
		{
			SPA: true,
			validators: zod(newPasswordSchema),
			async onChange(event) {
				valid =
					(await validateForm()).valid &&
					$form.password === $form.repeat_password;
			}
		}
	);

	async function submit() {
		let code = $page.url.searchParams.get("code");
		if (code === null) {
			error = "Некорректная ссылка.";
			return;
		}
		let result = await api($page).user.account.confirmRecovery.mutate({
			code,
			newPassword: $form.password
		});
		if (result.ok) {
			finish = true;
		} else {
			if (result.error === "EXPIRED") {
				error = "Срок действия ссылки истёк.";
			} else if (result.error === "NOT_FOUND") {
				error = "Некорректная ссылка.";
			}
		}
	}

	function complete() {
		goto("/auth/sign_in");
	}

	let error: string | null = null;
	let finish = false;
	let valid = false;
</script>

<main>
	<div class="header">
		<h4>Восстановление пароля</h4>
	</div>
	{#if !finish && !error}
		<form use:enhance>
			<div class="inputs">
				<label class="input" for={undefined}>
					<span>Пароль</span>
					<Input
						type="password"
						placeholder="Ваш пароль"
						bind:value={$form.password}
						required
						invalid={$errors.password ? true : false}
					/>
					{#if $errors.password}
						<span class="error">{$errors.password}</span>
					{/if}
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
					{#if $form.password !== $form.repeat_password}
						<span class="error">Пароли не совпадают</span>
					{/if}
				</label>
			</div>
			<Button
				text="Подтвердить новый пароль"
				kind="primary"
				on:click={submit}
				disabled={!valid}
			/>
		</form>
	{:else if finish}
		<div class="finish">
			<span>Пароль успешно изменён</span>
			<Button text="Войти" kind="primary" on:click={complete} />
		</div>
	{:else}
		<span class="error">{error}</span>
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
		span {
			font: var(--P2);
			color: var(--text);
		}
		.error {
			color: var(--error);
			font: var(--P2);
		}
	}
	.finish {
		display: flex;
		flex-direction: column;
		gap: 28px;
		text-align: center;
		width: 100%;
	}
	h4 {
		color: var(--text);
		font: var(--H4);
	}
	form {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 36px;
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
		.error {
			color: var(--error);
			font: var(--P2);
		}
	}
</style>
