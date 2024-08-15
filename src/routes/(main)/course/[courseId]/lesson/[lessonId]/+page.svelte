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
			{#each data.course.modules as module, i}
				<div class="module">
					<button>
						<span>Модуль {i + 1}. {module.title}</span>
					</button>
					<div class="lessons">
						{#each module.lessons as lesson}
							<a href={`/course/${data.course.id}/lesson/${lesson.id}`}>
								{lesson.title}
							</a>
						{/each}
					</div>
				</div>
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

		display: flex;
		flex-direction: column;
		gap: 10px;
		font: var(--B);

		.module {
			height: 72px;

			&:focus-within {
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
						min-height: 60px;
						padding: 10px 32px 10px 32px;
						font: var(--P1);
						line-height: 24px;
						text-decoration: none;
					}
				}
				button {
					background-color: var(--primary);
					color: var(--main-bg);
					border-radius: 8px 8px 0 0;
					border: none;
				}
			}

			& button {
				height: 72px;

				> span {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
				}

				padding: 12px 32px 12px 32px;
				text-align: left;
				width: 100%;
				background-color: var(--main-bg);
				border: 0.5px solid var(--secondary);
				border-radius: 8px;
			}

			.lessons {
				display: none;
			}
		}
	}
	.lesson {
		grid-area: lesson;
		background-color: var(--main-bg);
		border: 0.5px solid var(--secondary);
		border-radius: 8px;
	}
</style>
