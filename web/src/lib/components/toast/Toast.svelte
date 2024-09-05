<script lang="ts">
	import { removeToast, type ToastData } from ".";

	export let data: ToastData;
</script>

<section
	on:mouseenter={() => clearTimeout(data.timeoutId)}
	role={data.kind === "success" ? "status" : "alert"}
>
	<div class="info">
		{#if data.kind === "warning"}
			<img src="/icons/Warning.svg" alt="" />
		{:else if data.kind === "error"}
			<img src="/icons/Error.svg" alt="" />
		{:else if data.kind === "success"}
			<img src="/icons/Success.svg" alt="" />
		{/if}
		<div class="text">
			<h5>{data.header}</h5>
			<span>{data.text}</span>
		</div>
	</div>
	<div class="close">
		<button on:click={() => removeToast(data.id)}>
			<img src="/icons/X-16px-White.svg" alt="" />
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
			overflow-wrap: break-word;
			hyphens: auto;
		}
	}
	.close {
		padding: 16px 0 0 0;
		width: 18px;
		button,
		img {
			background-color: var(--primary);
			border: none;
			width: 18px;
			height: 18px;
		}
	}
</style>
