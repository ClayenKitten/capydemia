<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
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
				<button>
					<span>Модуль {i + 1}. {module.title}</span>
				</button>
				<div class="lessons">
					{#each module.lessons as lesson, j}
						<a
							class:current={lesson.id === data.lesson?.id}
							href={`/course/${data.course.id}/lesson/${lesson.id}`}
						>
							Урок {j + 1}. {lesson.title}
						</a>
					{/each}
				</div>
			</div>
		{/each}
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
		padding: 40px calc((max(100vw - 1276px, 0px)) / 2 + 64px);
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
					a {
						display: flex;
						align-items: center;
						min-height: 60px;
						padding: 10px 32px 10px 32px;
						font: var(--P1);
						color: var(--text);
						line-height: 24px;
						text-decoration: none;
						&.current {
							color: var(--primary);
						}
						&:not(.current):hover {
							color: var(--secondary);
						}
					}
				}
				button {
					background-color: var(--primary);
					color: var(--main-bg);
					border-radius: 8px 8px 0 0;
					border: none;
				}
			}

			button {
				height: 72px;
				padding: 12px 32px 12px 32px;
				text-align: left;
				width: 100%;
				background-color: var(--main-bg);
				border: 1px solid var(--secondary);
				border-radius: 8px;

				> span {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
				}
			}

			&:not(:focus-within, .current) > button:hover {
				color: var(--secondary);
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
	}
</style>
