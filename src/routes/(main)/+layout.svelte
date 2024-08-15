<header>
	<img src="/logo.svg" alt="logo" class="header_logo" />
	<div class="user">
		<img src="/icons/Bell-32px.svg" alt="bell" />
		<img src="/logo.svg" alt="logo" class="profile" />
	</div>
</header>

<slot />

<footer>
	<div class="footer_logo">
		<img src="/logo.svg" alt="logo" />
	</div>
</footer>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--base-bg);
	}
	.header_logo {
		padding: 20px 82px;
	}
	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 44px;
		padding: 24px 82px;
	}
	footer {
		display: flex;
		flex-direction: row;
		justify-content: left;
		background-color: var(--primary);
		padding: 36px 82px;
		width: 100%;
		margin-top: auto;
	}
	.footer_logo {
		height: 106px;
		width: 106px;
		display: flex;
		justify-content: center;
		border: 6px solid var(--main-bg);
		border-radius: 100%;
		background-color: var(--main-bg);
	}
</style>
