<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="wrapper">
	<header>
		<a class="logo" href="/" title="Главная">
			<img src="/logo.svg" alt="" />
		</a>
		<button class="notifications" title="Уведомления" on:click={() => {}}>
			<img src="/icons/Bell-32px.svg" alt="" />
		</button>
		<a class="profile" href="/profile" title="Профиль">
			<img src={data.user.avatar} alt="" />
		</a>
	</header>
	<div class="content">
		<slot />
	</div>
	<footer>
		<img class="logo" src="/logo.svg" alt="" />
	</footer>
</div>

<style lang="scss">
	.wrapper {
		display: inline-flex;
		flex-direction: column;
		height: 100%;
		min-width: 100%;
	}
	header {
		flex: 0 0 134px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--base-bg);
		padding: 0 82px;
		> .logo {
			margin: 20px 0;
			width: 100px;
		}
		.notifications {
			width: 32px;
			height: 32px;
			border: 0;
			border-radius: 100%;
			background-color: transparent;
			margin-left: auto;
		}
		.profile {
			width: 72px;
			height: 72px;
			margin-left: 44px;
			> img {
				width: 100%;
				height: 100%;
				border-radius: 100%;
				background-color: #ede7f6;
			}
		}
	}
	.content {
		flex: 1;
		padding: 0 82px;
		background-color: var(--base-bg);
	}
	footer {
		flex: 0 0 178px;
		display: flex;
		align-items: center;
		background-color: var(--primary);
		padding: 0 82px;
		.logo {
			height: 106px;
			width: 106px;
			display: flex;
			justify-content: center;
			border: 6px solid var(--main-bg);
			border-radius: 100%;
			background-color: var(--main-bg);
		}
	}
</style>
