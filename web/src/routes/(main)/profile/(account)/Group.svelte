<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let valid: boolean = true;
	let fieldSet: HTMLFieldSetElement;

	function checkValidity() {
		let nodes = fieldSet.querySelectorAll(
			"input, select, textarea"
		) as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
		for (const node of nodes) {
			if (!node.checkValidity()) return false;
		}
		return true;
	}

	let dispatch = createEventDispatcher<{ input: void }>();
</script>

<fieldset
	class="input"
	on:input={() => {
		valid = checkValidity();
		dispatch("input");
	}}
	bind:this={fieldSet}
>
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
</style>
