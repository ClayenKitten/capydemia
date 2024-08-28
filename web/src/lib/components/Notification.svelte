<script lang="ts">
	export let name: string;
	export let text: string;

	export let kind: "success" | "error" | "warning" = "warning";
</script>

<section>
	<div class="info">
		{#if kind === "warning"}
			<img src="/icons/Warning.svg" alt="" />
		{:else if kind === "error"}
			<img src="/icons/Error.svg" alt="" />
		{:else if kind === "success"}
			<img src="/icons/Success.svg" alt="" />
		{/if}
		<div class="text">
			<h5>{name}</h5>
			<span>{text}</span>
		</div>
	</div>

	<button class="close">
		<img src="/icons/X-16px.svg" alt="" />
	</button>
</section>

<style lang="scss">
	section {
		//flex: 0 0 420px;
		display: flex;
		gap: 24px;
		background-color: var(--primary);
		color: var(--main-bg);
		border-radius: 8px;
		border: 1px solid var(--secondary-bleek);
	}
	h5 {
		font: var(--H5);
	}
	span {
		font: var(--P1);
	}
	.info {
		display: flex;
		gap: 32px;
		padding: 24px 24px 24px 32px;

		img {
			width: 44px;
			height: 44px;
		}
		.text {
			flex: 0 0 254px;
			display: flex;
			flex-direction: column;
		}
	}
	button {
		background-color: var(--primary);
		border: none;
		padding: 16px 16px 0 0;
		width: 18px;
		height: 18px;
	}
</style>
