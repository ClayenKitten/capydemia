<script lang="ts">
	import { goto } from "$app/navigation";

	function submit() {
		//goto('/auth/recovery/new_password');
		confirmed = true;
	}

	let contact = "";
	let confirmed = false;
</script>

<main>
	<div class="content">
		{#if !confirmed}
			<div class="logo">Logo</div>

			<div class="form">
				<h1>Забыли пароль?</h1>

				<span>Укажите вашу почту для восстановления доступа к аккаунту.</span>

				<div class="input">
					<div class="type">
						<span>Email</span>
						<input bind:value={contact} />
					</div>

					<button on:click={submit} disabled={contact == ""}>Войти</button>
				</div>
			</div>
		{:else}
			<p>
				На указанную почту будет отправлено письмо с сылкой для восстановления
				пароля. Проверьте свой почтовый ящик!
			</p>
		{/if}
	</div>
</main>

<footer>
	<span>Help center</span>
	<span>Terms of Service</span>
	<span>Privacy Policy</span>
	<span>@capydemia</span>
</footer>

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
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 14px;
		gap: 40px;
		margin-top: 40px;
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
			border: 2px solid var(--fill-hoover);
			background-color: var(--fill-hoover);
		}

		&:disabled {
			background-color: var(--border);
			border-color: var(--border);
		}
	}
</style>
