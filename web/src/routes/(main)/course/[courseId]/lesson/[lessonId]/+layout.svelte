<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import type { LayoutData } from "./$types";
	import AddItem from "./AddItem.svelte";
	import * as m from "$lib/models";
	import Confirm from "$lib/components/Confirm.svelte";
	import Module from "../Module.svelte";

	export let data: LayoutData;

	const save = async () => {
		console.log(data.course);
		data.course.modules = data.course.modules;
		await api($page).course.updateCourse.mutate(data.course);
	};

	async function Refresh() {
		console.log("refresh");
		data.course.modules = data.course.modules;
	}

	async function addModule() {
		console.log("addModule");
		newModule = {
			title: "",
			id: null,
			lessons: []
		};
		data.course.modules.push(newModule);
		Refresh();
	}
	async function editModuleName(module: m.UpdateModule) {
		console.log("changingModule");
		if (module === newModule && module.title === "") {
			data.course.modules = data.course.modules.filter(x => x !== module);
		} else {
			save();
		}
		newModule = null;
	}
	async function deleteModule(module: m.UpdateModule) {
		console.log("deleteModule");
		data.course.modules = data.course.modules.filter(x => x !== module);
		save();
		modal_show = false;
	}
	let delete_module: m.UpdateModule;
	let newModule: m.UpdateModule | null = null;
	let modal_show: boolean = false;
	let expandedModule: number | null = data.module?.id;
	let modal_text: string;
</script>

<main class={!data.user.isTeacher ? "student" : "teacher"}>
	{#if modal_show}
		<div class="modal_confirm">
			<Confirm
				header="Подтвердите удаление"
				text="Вы хотите удалить {modal_text}?"
				on:confirm={() => deleteModule(delete_module)}
				on:cancel={() => (modal_show = false)}
			/>
		</div>
	{/if}
	<h1>{data.course.title}</h1>
	{#if !data.user.isTeacher}
		<div class="progress">
			<span>Пройдено 5/7 уроков</span>
		</div>

		<div class="achievements">
			<Button text="Достижения" kind="text" />
			<img alt="" />
			<img alt="" />
			<img alt="" />
		</div>
	{/if}

	<div class="modules">
		{#each data.course.modules as module, i}
			<div
				class="module"
				class:expanded={module.id === data.module?.id ||
					expandedModule === module.id}
			>
				<Module
					current={module.id === data.module?.id}
					editable={data.user.isTeacher}
					id={i}
					isNew={module === newModule ? true : false}
					bind:module
					courseId={data.course.id}
					currentLessonId={data.lesson?.id}
					bind:expanded={expandedModule}
					on:change={() => editModuleName(module)}
					on:delete={() => {
						modal_show = true;
						delete_module = module;
						modal_text = `модуль ${i + 1} "${module.title}"`;
					}}
					on:expanded={() => (expandedModule = module.id)}
					on:refresh={Refresh}
					on:save={save}
				/>
			</div>
		{/each}
		{#if data.user.isTeacher}
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
			background: #292d2f66;
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
		gap: 12px;
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
