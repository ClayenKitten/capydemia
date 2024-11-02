<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	const dispatch = createEventDispatcher<{ changed: void }>();

	export let data: EditorJS.OutputData;
	export let placeholder = "";
	export let readOnly: boolean = false;

	let holder: HTMLElement;
	let editor: EditorJS.default;
	let editorReady: boolean = false;

	onMount(async () => {
		const EditorJS = await import("@editorjs/editorjs");
		const Header = await import("@editorjs/header");
		const List = await import("@editorjs/list");
		const NestedList = await import("@editorjs/nested-list");

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
			data: data ?? undefined,
			onChange: () => dispatch("changed")
		});
		await editor.isReady;
		editorReady = true;
	});

	$: if (editorReady) editor.render(data);

	export function save(): Promise<EditorJS.OutputData> {
		return editor.save();
	}
</script>

<div bind:this={holder} />

<style lang="scss">
	div {
		font: var(--P1);
		color: var(--text);
	}
</style>
