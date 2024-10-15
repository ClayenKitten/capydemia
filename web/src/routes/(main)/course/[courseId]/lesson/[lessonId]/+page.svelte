<script lang="ts">
	import { invalidateAll, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import EditorJS from "$lib/components/Editor.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const save = async () => {
		await api($page).course.updateCourse.mutate(data.course);
	};
	onNavigate(async () => {
		if (changed) {
			reset();
		}
	});

	const reset = async () => {
		await invalidateAll();
		changes = {
			personal: false,
			email: false,
			password: false,
			avatar: false
		};
	};

	let changes = {
		personal: false,
		email: false,
		password: false,
		avatar: false
	};
	$: changed = Object.values(changes).some(x => x);
</script>

<main>
	<h5>Конспект урока</h5>
	<div class="editorjs">
		<EditorJS data={data.lessonContent} readOnly={!data.user.isTeacher} />
	</div>
	<div class="finish">
		<Button
			kind="primary"
			text="Сохранить"
			disabled={!changed}
			on:click={save}
		/>
		<Button kind="secondary" text="Отменить" disabled />
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
