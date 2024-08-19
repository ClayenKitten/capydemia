<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="editorjs"></div>
<h5>Конспект урока</h5>
<span>{data.lessonContent}</span>
