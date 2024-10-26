<script lang="ts">
	import { invalidateAll, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import ListItem from "../ListItem.svelte";
	import type { PageData } from "./$types";
	import AddItem from "./AddItem.svelte";
	import * as m from "$lib/models";
	import Confirm from "$lib/components/Confirm.svelte";

	export let data: PageData;

	const save = async () => {
		console.log("save");
		//data.course.modules = data.course.modules;
		await api($page).course.updateCourse.mutate(data.course);
	};

	async function addModule() {
		console.log("addModule");
		newModule = {
			title: "",
			id: null,
			lessons: []
		};
		data.course.modules.push(newModule);
		data.course.modules = data.course.modules;
	}

	async function addLesson(module: m.UpdateModule) {
		console.log("addLesson");
		newLesson = {
			title: "",
			id: null
		};
		module.lessons.push(newLesson);
		data.course.modules = data.course.modules;
	}

	async function editModuleName(module: m.UpdateModule) {
		console.log("changingModule");
		if (module === newModule && module.title === "") {
			data.course.modules = data.course.modules.filter(x => x !== module);
		}
		newModule = null;
		editing = false;
		data.course.modules = data.course.modules;
		save();
	}
	async function editLessonName(
		module: m.UpdateModule,
		lesson: m.UpdateLesson
	) {
		console.log("changingLesson");
		if (lesson === newLesson && lesson.title === "") {
			module.lessons = module.lessons.filter(x => x != newLesson);
		}
		newLesson = null;
		data.course.modules = data.course.modules;
		save();
	}

	async function deleteModule(module: m.UpdateModule) {
		modal_show = true;
		if (confirm) {
			console.log("deleteModule");
			data.course.modules = data.course.modules.filter(x => x !== module);
			save();
			modal_show = false;
			confirm = false;
		}
	}
	async function deleteLesson(module: m.UpdateModule, lesson: m.UpdateLesson) {
		console.log("deleteLesson");
		module.lessons = module.lessons.filter(x => x !== lesson);
		save();
	}

	//let modules_list = data.course.modules;
	let newModule: m.UpdateModule | null = null;
	let newLesson: m.UpdateLesson | null = null;
	let editing: boolean = false;
	let modal_show: boolean = false;
	let confirm: boolean = false;
</script>

<main class={!data.user.isTeacher ? "student" : "teacher"}>
	{#if modal_show}
		<div class="modal_confirm">
			<Confirm
				header="Подтвердите удаление"
				text="Вы хотите удалить Вы хотите удалить Вы хотите удалить Вы хотите удалить ?"
				on:confirm={() => (confirm = true)}
				on:cancel={() => (modal_show = false)}
			/>
		</div>
	{/if}
	<h1>{data.course.title}</h1>
	{#if data.user.isTeacher === false}
		<div class="progress">
			<span>Пройдено 5/7 уроков</span>
		</div>

		<div class="achievements">
			<Button text="Достижения" kind="text" />
			<img alt="ach" />
			<img alt="ach" />
			<img alt="ach" />
		</div>
	{/if}

	<div class="modules">
		{#each data.course.modules as module, i}
			<div
				class="module"
				class:current={module.id === data.module?.id}
				class:editing
			>
				<div class="module_header">
					<ListItem
						kind="module"
						current={module.id === data.module?.id}
						editable={data.user.isTeacher}
						id={i}
						isNew={module === newModule ? true : false}
						bind:name={module.title}
						on:change={() => editModuleName(module)}
						on:delete={() => deleteModule(module)}
						on:editing={() => (editing = true)}
					/>
				</div>
				<div class="lessons">
					{#each module.lessons as lesson, j}
						<div
							class="lesson_header"
							class:current={lesson.id === data.lesson?.id}
						>
							<ListItem
								kind="lesson"
								current={lesson.id === data.lesson?.id}
								editable={data.user.isTeacher}
								id={j}
								isNew={lesson === newLesson ? true : false}
								bind:name={lesson.title}
								href="/course/{data.course.id}/lesson/{lesson.id}"
								on:change={() => editLessonName(module, lesson)}
								on:delete={() => deleteLesson(module, lesson)}
							/>
						</div>
					{/each}
					{#if data.user.isTeacher === true}
						<AddItem
							kind="lesson"
							text="Добавить урок"
							on:addLesson={() => addLesson(module)}
						/>
					{/if}
				</div>
			</div>
		{/each}
		{#if data.user.isTeacher === true}
			<AddItem kind="module" text="Добавить модуль" on:addModule={addModule} />
		{/if}
	</div>
	<div class="lesson">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 336px 1fr 336px;
		grid-template-rows: min-content 82px auto;
		grid-template-areas:
			"header header header"
			"progress progress achievements"
			"modules lesson lesson";
		gap: 40px 40px;
		padding: 40px 0 188px 0;
		margin: 0 auto;
		max-width: 1276px;
		background-color: var(--base-bg);
		&.teacher {
			grid-template-rows: min-content auto;
			grid-template-areas:
				"header header header"
				"modules lesson lesson";
		}
		.modal_confirm {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1000;
		}
	}
	h1 {
		grid-area: "header";
		font: var(--H1);
	}
	.progress {
		grid-area: progress;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;

		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 20px 20px 20px;
		gap: 12px;
		font: var(--P3-extrabold);
	}
	.achievements {
		grid-area: achievements;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
	}
	.modules {
		grid-area: modules;

		display: flex;
		flex-direction: column;
		gap: 10px;
		font: var(--B);

		.module {
			height: 72px;

			/*&:not(.editing)*/
			&:focus-within,
			&.current {
				max-height: 340px;
				height: min-content;
				.lessons {
					display: flex;
					flex-direction: column;
					background-color: var(--main-bg);
					border: 1px solid var(--secondary);
					border-top: none;
					border-radius: 0 0 8px 8px;
					padding: 12px 0 12px 0;
				}
			}
			.lessons {
				display: none;
			}
		}
	}
	.lesson {
		grid-area: lesson;

		display: flex;
		flex-direction: column;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		overflow: hidden;
		padding: 32px 32px 32px 32px;
	}
</style>
