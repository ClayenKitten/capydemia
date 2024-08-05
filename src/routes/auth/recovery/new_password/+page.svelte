<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";

	async function submit() {
		let code = $page.url.searchParams.get("code");
		if (code === null) {
			error = "Некорректная ссылка.";
			return;
		}
		let result = await api($page).user.password.recovery.complete.mutate({
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
	<div class="content">
		{#if !finish}
			<div class="logo">Logo</div>
			<div class="form">
				<h1>Восстановление пароля</h1>
				{#if !error}
					<div class="input">
						<label class="type">
							<span>Новый пароль</span>
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
						<button on:click={submit} disabled={!valid}>
							Сменить пароль
						</button>
					</div>
				{:else}
					<span class="error">{error}</span>
				{/if}
			</div>
		{:else}
			<p>Пароль успешно изменён!</p>
			<a href="/auth/sign_in">Войти</a>
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
	.invalid {
		border-color: var(--error);
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
	.error {
		color: var(--error);
	}
</style>
