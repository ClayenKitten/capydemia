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

	<div class="close">
		<button>
			<img src="/icons/X-16px.svg" alt="" />
		</button>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		width: 420px;
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
			width: 254px;
			display: flex;
			flex-direction: column;
		}
	}
	.close {
		padding: 16px 0 0 0;
		width: 18px;
		button {
			background-color: var(--primary);
			border: none;
			width: 18px;
			height: 18px;
		}
	}
</style>
