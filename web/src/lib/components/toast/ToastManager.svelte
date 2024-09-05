<script lang="ts">
	import { removeToast, toastState, type ToastData } from ".";
	import Toast from "./Toast.svelte";
	import { onMount } from "svelte";

	let toasts: ToastData[] = [];

	onMount(() => {
		const unsubscribe = toastState.subscribe(value => (toasts = value));
		return unsubscribe;
	});
</script>

<div role="log">
	{#each toasts as toast (toast.id)}
		<Toast data={toast} on:close={() => removeToast(toast.id)} />
	{/each}
</div>

<style lang="scss">
	div {
		position: fixed;
		bottom: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
	}
</style>
