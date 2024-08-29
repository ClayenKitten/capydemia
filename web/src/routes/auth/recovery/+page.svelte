<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import { z } from "zod";

	async function submit() {
		await api($page).user.account.recover.mutate({ email });
		confirmed = true;
	}

	let email = "";
	let confirmed = false;

	$: valid_email = z.string().email().max(128).safeParse(email).success;
	$: valid = valid_email;
</script>

<main>
	<div class="content">
		{#if !confirmed}
			<div class="logo">Logo</div>
			<div class="form">
				<h1>Забыли пароль?</h1>
				<span>Укажите вашу почту для восстановления доступа к аккаунту.</span>
				<div class="input">
					<label class="type">
						<span>Email</span>
						<input
							type="email"
							bind:value={email}
							class:invalid={!valid_email}
						/>
					</label>
					<button on:click={submit} disabled={!valid}>
						Запросить восстановление
					</button>
				</div>
			</div>
		{:else}
			<p>
				На указанную почту будет отправлено письмо со ссылкой для восстановления
				пароля. Проверьте свой почтовый ящик!
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
</style>
