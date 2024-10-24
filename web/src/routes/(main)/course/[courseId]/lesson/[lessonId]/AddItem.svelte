<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let kind: "module" | "lesson";
	export let text: string;

	function addItem() {
		if (kind === "module") {
			dispatch("addModule");
		} else {
			dispatch("addLesson");
		}
	}
</script>

<button class={kind} on:click={addItem}>
	<img src="/icons/Plus-24px.svg" alt="" />
	{text}
</button>

<style lang="scss">
	button {
		width: 100%;
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
		&:hover {
			color: var(--secondary);
			img {
				filter: var(--filter-secondary);
			}
		}
		&:active {
			color: var(--primary);
			img {
				filter: var(--filter-primary);
			}
		}
	}
	.module {
		padding: 16px 0;
	}
	.lesson {
		gap: 8px;
		padding: 8px 16px 8px 0;
	}
</style>
