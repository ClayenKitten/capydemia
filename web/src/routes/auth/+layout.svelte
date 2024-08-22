<div>
	<slot />
</div>
<footer>
	<span>Help center</span>
	<span>Terms of Service</span>
	<span>Privacy Policy</span>
	<span>@capydemia</span>
</footer>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
	}
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 14px;
		gap: 40px;
		margin-top: 40px;
	}
</style>
