<script lang="ts">
	import EditorJS from "$lib/components/Editor.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="editorjs">
	<EditorJS>
		
	</EditorJS>
</div>
<h5>Конспект урока</h5>
<span>{data.lessonContent}</span>
