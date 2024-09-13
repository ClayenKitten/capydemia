<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let kind: "module" | "lesson";
	export let text: string;

	function addModule() {
		dispatch("addModule");
	}
	function addLesson() {
		dispatch("addLesson");
	}
</script>

<button class={kind}>
	<img src="/icons/Plus-24px.svg" alt="" />
	{text}
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font: var(--B);
		color: var(--primary);
		border: none;
		background-color: inherit;
		img {
			height: 16px;
			width: 16px;
			filter: var(--filter-primary);
		}
	}
	.module {
		padding: 16px 16px 16px 0;
	}
	.lesson {
		padding: 8px 16px 8px 0;
	}
</style>
