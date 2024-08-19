<script lang="ts">
	import { onMount } from "svelte";

	export let data: EditorJS.OutputData;
	let holder: HTMLElement;

	onMount(async () => {
		const EditorJS = await import("@editorjs/editorjs");
		const Header = await import("@editorjs/header");
		const List = await import("@editorjs/list");
		const NestedList = await import("@editorjs/nested-list");
		//const CodeTool = await import('@editorjs/code');
		//const SimpleImage = await import('@editorjs/simple-image');

		let editor: EditorJS.default;
		editor = new EditorJS.default({
			holder,
			tools: {
				header: Header.default,
				list: List.default,
				nested: NestedList.default
				//code: CodeTool.default,
				//image: SimpleImage.default
			},
			placeholder: "Давайте напишем что-то потрясающее!",
			readOnly: true,
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
