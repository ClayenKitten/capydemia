<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";

	async function submit() {
		let code = $page.url.searchParams.get("code");
		if (code === null) {
			error = "Некорректная ссылка.";
			return;
		}
		let result = await api($page).user.account.confirmRecovery.mutate({
			code,
			newPassword: password
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
	let error: string | null = null;
	let password = "";
	let repeat_password = "";
	let finish = false;

	$: valid_password = password.length >= 8 && password.length <= 128;
	$: valid_repeat_password = password === repeat_password;
	$: valid = valid_password && valid_repeat_password;
</script>

<main>
	<div class="header">
		<h4>Восстановление пароля</h4>
	</div>
	<div class="inputs">
		<div class="type">
			<label class="input">
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
			<label class="input">
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
			text="Подтвердить новый пароль"
			kind="primary"
			on:click={submit}
			disabled={password == "" || !valid}
		/>
	</div>
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
</style>
