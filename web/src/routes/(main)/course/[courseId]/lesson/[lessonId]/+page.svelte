<script lang="ts">
	import { invalidateAll, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import EditorJS from "$lib/components/Editor.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const save = async () => {
		if (changed) {
			///console.log("saved");
			await api($page).course.updateCourse.mutate(data.course);
		}
		changed = false;
	};

	const reset = async () => {
		if (changed) {
			console.log("reset");
			data.lessonContent = initialData;
			//location.reload();
		}
		changed = false;
	};

	let changed = false;
	let initialData = data.lessonContent;
</script>

<main>
	<h5>Конспект урока</h5>
	<div class="editorjs">
		<EditorJS
			bind:data={data.lessonContent}
			readOnly={!data.user.isTeacher}
			on:changed={() => (changed = true)}
		/>
	</div>
	<div class="finish">
		<Button
			kind="primary"
			text="Сохранить"
			disabled={!changed}
			on:click={save}
		/>
		<Button
			kind="secondary"
			text="Отменить"
			disabled={!changed}
			on:click={reset}
		/>
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
	.finish {
		display: flex;
		gap: 20px;
		justify-content: end;
	}
</style>
