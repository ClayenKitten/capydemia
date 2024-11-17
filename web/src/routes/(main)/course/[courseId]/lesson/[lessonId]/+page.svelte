<script lang="ts">
	import { invalidate, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import EditorJS from "$lib/components/Editor.svelte";
	import * as m from "$lib/models";
	import type { PageData } from "./$types";

	export let data: PageData;

	const save = async () => {
		if (changed) {
			await api($page).course.updateLessonContent.mutate({
				id: Number($page.params.lessonId),
				content: await saveEditorContent()
			});
			await invalidate("custom:lessonContent");
		}
		changed = false;
	};
	let saveEditorContent: () => Promise<m.LessonContent>;

	const reset = async () => {
		await invalidate("custom:lessonContent");
		changed = false;
	};

	let changed = false;
	onNavigate(() => {
		changed = false;
	});
</script>

<main>
	<div class="editorjs">
		<EditorJS
			data={data.lessonContent}
			readOnly={!data.user.isTeacher}
			on:changed={() => (changed = true)}
			bind:save={saveEditorContent}
		/>
	</div>
	{#if data.user.isTeacher}
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
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.finish {
		display: flex;
		gap: 20px;
		justify-content: end;
	}
</style>
