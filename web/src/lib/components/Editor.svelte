<script lang="ts">
	import { onMount } from "svelte";

	export let data: EditorJS.OutputData;
	export let placeholder = "";
	export let readOnly: boolean = false;
	let holder: HTMLElement;

	onMount(async () => {
		const EditorJS = await import("@editorjs/editorjs");
		const Header = await import("@editorjs/header");
		const List = await import("@editorjs/list");
		const NestedList = await import("@editorjs/nested-list");

		let editor: EditorJS.default;
		editor = new EditorJS.default({
			holder,
			tools: {
				header: Header.default,
				list: List.default,
				nested: NestedList.default
			},
			placeholder,
			readOnly,
			minHeight: 0,
			data
		});
	});
</script>

<div bind:this={holder} />

<style lang="scss">
	div {
		font: var(--P1);
		color: var(--text);
	}
</style>
