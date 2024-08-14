<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>Капибаза</h1>
	<div class="content">
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
			{#each data.course.modules as module}
				<span>{module.title}</span>
				{#each module.lessons as lesson}
					<a href={`/course/${data.course.id}/lesson/${lesson.id}`}>
						{lesson.title}
					</a>
				{/each}
			{/each}
		</div>

		<div class="lesson">
			<span> </span>
			<div class="editorjs"></div>
			<h5>Конспект урока</h5>
			<span>{data.lessonContent}</span>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: left;
		padding: 40px 82px;
		background-color: var(--base-bg);
	}
	h1 {
		padding-bottom: 40px;
		font: var(--H1);
	}
	.content {
		display: grid;
		gap: 50px 40px;
		grid-template-columns: 336px 524px 336px;
		grid-template-rows: 82px auto;
		grid-template-areas:
			"progress progress achievements"
			"modules lesson lesson";
	}
	.progress {
		grid-area: progress;
		background-color: var(--main-bg);
		border: 0.5px solid var(--secondary);
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
		border: 0.5px solid var(--secondary);
		border-radius: 8px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
	}
	.modules {
		grid-area: modules;
		background-color: var(--main-bg);
		border: 0.5px solid var(--secondary);
		border-radius: 8px;
	}
	.lesson {
		grid-area: lesson;
		background-color: var(--main-bg);
		border: 0.5px solid var(--secondary);
		border-radius: 8px;
	}
</style>
