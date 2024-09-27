<script lang="ts">
	import { invalidateAll, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { createToastNotification } from "$lib/components/toast";
	import type { PageData } from "./$types";
	import Group from "./Group.svelte";

	export let data: PageData;

	const save = async () => {
		if (changes.personal) {
			await api($page).user.profile.changeInfo.mutate({
				firstName: data.user.firstName,
				lastName: data.user.lastName,
				patronim: data.user.patronim === "" ? null : data.user.patronim
			});
			createToastNotification(
				"success",
				"Данные изменены",
				"Личные профиля успешно изменены"
			);
		}
		if (changes.email) {
			let result = await api($page).user.profile.requestEmailChange.mutate({
				newEmail: data.user.email
			});
			if (result.ok) {
				createToastNotification(
					"warning",
					"Подтвердите Email",
					`На адрес '${data.user.email}' отправлено письмо с ссылкой для подтверждения.`
				);
			} else if (result.error === "SAME_EMAIL") {
				// Do nothing
			}
		}
		if (changes.password) {
			let result = await api($page).user.profile.changePassword.mutate({
				newPassword: newPassword,
				oldPassword: oldPassword
			});
			if (result.ok) {
				createToastNotification(
					"warning",
					"Пароль изменён",
					`Пароль успешно изменён.`
				);
			} else if (result.error === "MISMATCH") {
				createToastNotification(
					"error",
					"Ошибка",
					`Неверно указан текущий пароль.`
				);
			}
		}
		if (changes.avatar) {
			await api($page).user.profile.changeAvatar.mutate({
				newUrl: data.user.avatar
			});
		}
		await reset();
	};

	onNavigate(async () => {
		if (changed) {
			reset();
		}
	});

	const reset = async () => {
		await invalidateAll();
		changes = {
			personal: false,
			email: false,
			password: false,
			avatar: false
		};
	};

	let changes = {
		personal: false,
		email: false,
		password: false,
		avatar: false
	};
	$: changed = Object.values(changes).some(x => x);

	$: valid =
		validPersonal &&
		validContacts &&
		validPassword &&
		checkPassword(oldPassword, newPassword, repeatPassword);
	let validPersonal = true;
	let validContacts = true;
	let validPassword = true;

	let oldPassword = "";
	let newPassword = "";
	let repeatPassword = "";

	function checkPassword(
		oldPassword: string,
		newPassword: string,
		repeatPassword: string
	) {
		// Don't check "repeatPassword", as browsers may forcefully autocomplete it.
		if (newPassword === "" && repeatPassword === "") {
			return true;
		}
		if (oldPassword === "" || newPassword === "" || repeatPassword === "") {
			return false;
		}
		if (newPassword !== repeatPassword) {
			return false;
		}
		return true;
	}

	function isPasswordChanged() {
		// Don't check "repeatPassword", as browsers may forcefully autocomplete it.
		return newPassword !== "" || repeatPassword !== "";
	}
</script>

<header>
	<h2>Данные аккаунта</h2>
	<span>
		Данные аккаунта обеспечивают идентификацию пользователя и используются для
		создания сертификатов, пройденных Вами курсов, а также позволяют нам
		связаться с Вами.
	</span>
</header>
<section class="inputs">
	<Group bind:valid={validPersonal} on:input={() => (changes.personal = true)}>
		<h4>Личные данные</h4>
		<div class="personal">
			<div class="personal_input">
				<label class="input" for={undefined}>
					<span>Имя</span>
					<Input
						placeholder="Введите имя"
						bind:value={data.user.firstName}
						required
						maxlength={128}
					/>
				</label>

				<label class="input" for={undefined}>
					<span>Фамилия</span>
					<Input
						placeholder="Введите фамилию"
						bind:value={data.user.lastName}
						required
						maxlength={128}
					/>
				</label>

				<label class="input" for={undefined}>
					<span>Отчество</span>
					<Input
						placeholder="Введите отчество"
						bind:value={data.user.patronim}
						maxlength={128}
					/>
				</label>
			</div>
			<button type="button" class="photo">
				<img src={data.user.avatar} alt="Фото" />
				<span>Сменить фото</span>
			</button>
		</div>
	</Group>
	<Group bind:valid={validContacts}>
		<h4>Контактная информация</h4>
		<div class="contacts">
			<label class="input" for={undefined}>
				<span>Почта</span>
				<Input
					type="email"
					placeholder="Введите почту"
					autocomplete="new-email"
					bind:value={data.user.email}
					required
					on:input={() => (changes.email = true)}
					maxlength={320}
				/>
			</label>

			<!--- TODO: may be implemented later -->
			<!--- <Input placeholder="Введите номер телефона" {valid} /> -->
		</div>
	</Group>
	<Group
		bind:valid={validPassword}
		on:input={() => (changes.password = isPasswordChanged())}
	>
		<h4>Смена пароля</h4>
		<div class="password">
			<div class="old_password">
				<Input
					type="password"
					placeholder="Введите текущий пароль"
					bind:value={oldPassword}
					autocomplete="current-password"
				/>
			</div>
			<div class="new_password">
				<Input
					type="password"
					placeholder="Введите новый пароль"
					bind:value={newPassword}
					autocomplete="new-password"
					minlength={8}
					maxlength={128}
				/>
				<Input
					type="password"
					placeholder="Повторите новый пароль"
					bind:value={repeatPassword}
					autocomplete="new-password"
					minlength={8}
					maxlength={128}
				/>
			</div>
		</div>
	</Group>
</section>
<div class="confirm">
	<Button
		text="Подтвердить изменения"
		kind="primary"
		on:click={save}
		disabled={!changed || !valid}
	/>
</div>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 0 12px 0 12px;
		color: var(--text);
		font: var(--P1);

		h2 {
			font: var(--H2);
		}
	}
	h4 {
		font: var(--H4);
		color: var(--text);
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 20px;
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
	.personal {
		display: flex;
		gap: 32px;
		justify-content: center;
		.photo {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2px;
			border: none;
			background-color: var(--main-bg);
			img {
				height: 141px;
				width: 141px;
				border-radius: 100%;
				border: 1px solid var(--secondary);
				background-color: #ede7f6;
			}
			span {
				font: var(--P1-bold);
				color: var(--primary);
			}
		}
	}
	.personal_input {
		display: flex;
		flex-flow: wrap;
		row-gap: 18px;
		column-gap: 32px;
	}
	.contacts {
		display: flex;
		flex-flow: wrap;
		row-gap: 18px;
		column-gap: 32px;
	}
	.password {
		display: flex;
		flex-direction: column;
		gap: 18px;
		.new_password {
			display: flex;
			flex-flow: wrap;
			row-gap: 18px;
			column-gap: 32px;
		}
	}
	.confirm {
		display: flex;
		justify-content: right;
	}
</style>
