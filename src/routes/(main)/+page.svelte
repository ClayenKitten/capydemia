<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";

	async function logout() {
		await api($page).user.session.logout.mutate();
		await goto("/auth/sign_in");
	}
</script>

<main>
	<hi>This is the main page!</hi>
	{#await api($page).user.getInfo.query()}
		Загрузка...
	{:then user}
		Вы вошли с почтой {user.email} (ID{user.id}).
	{/await}
	<button on:click={logout}>Выйти из аккаунта</button>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px;
	}
	button {
		width: 200px;
		height: 40px;
		margin: 20px 10px;
	}
</style>
