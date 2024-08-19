<script lang="ts">
	import EditorJS from "$lib/components/Editor.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h5>Конспект урока</h5>
	<div class="editorjs">
		<EditorJS data={data.lessonContent} />
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	h5 {
		font: var(--H5);
		color: var(--text);
	}
</style>
