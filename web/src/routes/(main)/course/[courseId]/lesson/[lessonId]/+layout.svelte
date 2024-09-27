<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import ListItem from "../ListItem.svelte";
	import type { PageData } from "./$types";
	import AddItem from "./AddItem.svelte";

	export let data: PageData;

	function addLesson() {
		/*data.course.createCourse.mutate({
			title:"",
			description:""
		})*/
	}
	function deleteItem() {}
</script>

<main>
	<h1>{data.course.title}</h1>
	<div class="progress">
		<span>Пройдено 5/7 уроков</span>
	</div>

	<div class="achievements">
		<Button text="Достижения" kind="text" />
		<img alt="ach" />
		<img alt="ach" />
		<img alt="ach" />
	</div>

	<div class="modules">
		{#each data.course.modules as module, i}
			<div class="module" class:current={module.id === data.module?.id}>
				<div class="module_header">
					{#if data.user.isTeacher === false}
						<ListItem
							kind="module"
							current={module.id === data.module?.id}
							id={i}
							name={module.title}
						/>
					{:else}
						<ListItem
							kind="module"
							current={module.id === data.module?.id}
							status="teacher"
							id={i}
							name={module.title}
							on:delete={deleteItem}
						/>
					{/if}
				</div>
				<div class="lessons">
					{#each module.lessons as lesson, j}
						<div
							class="lesson_header"
							class:current={lesson.id === data.lesson?.id}
						>
							{#if data.user.isTeacher === false}
								<ListItem
									kind="lesson"
									current={lesson.id === data.lesson?.id}
									id={j}
									name={lesson.title}
									href="/course/{data.course.id}/lesson/{lesson.id}"
								/>
							{:else}
								<ListItem
									kind="lesson"
									current={lesson.id === data.lesson?.id}
									status="teacher"
									id={j}
									name={lesson.title}
									href="/course/{data.course.id}/lesson/{lesson.id}"
									on:delete={deleteItem}
								/>
							{/if}
						</div>
					{/each}
					{#if data.user.isTeacher === true}
						<AddItem kind="lesson" text="Добавить урок" on:click={addLesson} />
					{/if}
				</div>
			</div>
		{/each}
		{#if data.user.isTeacher === true}
			<AddItem kind="module" text="Добавить модуль" on:click={addLesson} />
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
		padding: 40px 0;
		margin: 0 auto;
		max-width: 1276px;
		background-color: var(--base-bg);
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
