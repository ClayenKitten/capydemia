<script lang="ts">
	import { goto } from "$app/navigation";

	function create() {
		goto("/main_page");
	}
	let contact = "";
	let password = "";
	let repeat_password = "";
	let disabled = 1;
</script>

<main>
	<div class="content">
		<div class="logo">Logo</div>
		<div class="form">
			<h1>Регистрация</h1>

			<div class="input">
				<div class="type">
					<span>Email</span>
					<input bind:value={contact} />
				</div>

				<div class="type">
					<span>Пароль</span>
					<input type="password" bind:value={password} />
				</div>

				<div class="type">
					<span>Повторите пароль</span>
					<input type="password" bind:value={repeat_password} />
				</div>

				<button
					on:click={create}
					disabled={password !== repeat_password ||
						password == "" ||
						contact == ""}>Зарегистрироваться</button
				>
			</div>
		</div>

		<div class="sign_up_offer">
			<span>Уже есть аккаунт?</span>
		</div>

		<a href="/auth/sign_in" class="button">Войти</a>
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
	.sign_up_offer {
		margin: 5px;
		font-size: 20px;
	}
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 14px;
		gap: 40px;
		margin-top: 40px;
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
			border: 2px solid var(--fill-hoover);
			background-color: var(--fill-hoover);
		}

		&:disabled {
			background-color: var(--border);
			border-color: var(--border);
		}
	}
	.button {
		color: var(--button-text--sec);
		background-color: var(--fill-sec);
		border: 2px solid var(--border-sec);

		&:hover {
			border: 2px solid var(--border-sec-hoover);
			background-color: var(--fill-sec);
			color: var(--button-text-hoover);
		}

		&:disabled {
			background-color: var(--text-note);
			border-color: var(--text-note);
		}
	}
</style>
