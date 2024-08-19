<script lang="ts">
	import { onMount } from "svelte";

	let holder: HTMLElement;
    
    onMount(async () => {		
		const EditorJS = await import('@editorjs/editorjs');
		const Header = await import('@editorjs/header');
		const List = await import('@editorjs/list');

		let editor: EditorJS.default;
		editor = new EditorJS.default({
			holder: "editorjs",
			tools: {
				header: Header.default,
				list: List.default
			},
			placeholder: 'Let`s write an awesome story!',
			//readOnly: true
		});
    }) 
</script>

<div bind:this={holder} />