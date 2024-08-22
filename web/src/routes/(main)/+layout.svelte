<div class="wrapper">
	<header>
		<a class="logo" href="/" title="Главная">
			<img src="/logo.svg" alt="" />
		</a>
		<button class="notifications" title="Уведомления" on:click={() => {}}>
			<img src="/icons/Bell-32px.svg" alt="" />
		</button>
		<a class="profile" href="/profile" title="Профиль">
			<img src="/avatar.svg" alt="Аватар" />
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
		display: flex;
		flex-direction: column;
		width: min(auto, max-content);
		height: 100%;
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
		width: 100%;
		margin-top: auto;
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
