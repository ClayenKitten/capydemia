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
				<div class="module_header">
					<button class="module_button">
						<span>Модуль {i + 1}. {module.title}</span>
					</button>
					{#if data.user.isTeacher === true}
						<div class="edit_buttons">
							<button class="edit_module_name">
								<img src="/icons/PencilSimple-32px.svg" alt="" />
							</button>
							<button class="delete_module">
								<img src="/icons/Trash-32px.svg" alt="" />
							</button>
						</div>
					{/if}
				</div>
				<div class="lessons">
					{#each module.lessons as lesson, j}
						<div
							class="lesson_header"
							class:current={lesson.id === data.lesson?.id}
						>
							<a href={`/course/${data.course.id}/lesson/${lesson.id}`}>
								Урок {j + 1}. {lesson.title}
							</a>
							{#if data.user.isTeacher === true}
								<div class="edit_buttons">
									<button class="edit_module_name">
										<img src="/icons/PencilSimple-32px.svg" alt="" />
									</button>
									<button class="delete_module">
										<img src="/icons/Trash-32px.svg" alt="" />
									</button>
								</div>
							{/if}
						</div>
					{/each}
					{#if data.user.isTeacher === true}
						<button class="add_lesson">
							<img src="/icons/Plus-24px.svg" alt="" />
							Добавить урок
						</button>
					{/if}
				</div>
			</div>
		{/each}
		{#if data.user.isTeacher === true}
			<button class="add_module">
				<img src="/icons/Plus-24px.svg" alt="" />
				Добавить модуль
			</button>
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

		button {
			border: none;
			background-color: inherit;
		}
		.edit_buttons {
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 12px 32px 12px 0;
			button {
				height: 24px;
				width: 24px;
				img {
					filter: var(--filter-primary);
				}
			}
		}

		.module {
			height: 72px;

			.module_header {
				display: flex;
				justify-content: space-between;
				height: 72px;
				width: 100%;
				background-color: var(--main-bg);
				border: 1px solid var(--secondary);
				border-radius: 8px;

				.module_button {
					width: 100%;
					text-align: left;
					padding: 12px 0 12px 32px;
					border-radius: 8px;

					> span {
						color: var(--text);
						max-width: 218px;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-box-orient: vertical;
					}
				}
			}

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
					.lesson_header {
						display: flex;
						align-items: center;
						a {
							display: flex;
							align-items: center;
							min-height: 60px;
							padding: 10px 0 10px 32px;
							width: 100%;
							font: var(--P1);
							color: var(--text);
							text-decoration: none;
						}
						&.current {
							background-color: var(--secondary);
						}
						&:not(.current):hover {
							a {
								color: var(--secondary);
							}
						}
					}
				}
				.module_header {
					background-color: var(--primary);
					color: var(--main-bg);
					border-radius: 8px 8px 0 0;
					border: none;

					.module_button {
						border-radius: 8px 8px 0 0;
						span {
							color: var(--main-bg);
						}
					}
					.edit_buttons {
						button {
							img {
								filter: var(--filter-main-bg);
							}
						}
					}
				}
			}

			&:not(:focus-within, .current) > .module_header:hover {
				span {
					color: var(--secondary);
				}
			}

			.lessons {
				display: none;
			}
			.add_lesson {
				display: flex;
				gap: 8px;
				justify-content: center;
				align-items: center;
				padding: 8px 16px 8px 0;
				font: var(--B);
				color: var(--primary);
				img {
					height: 16px;
					width: 16px;
					filter: var(--filter-primary);
				}
			}
		}
		.add_module {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			padding: 16px 16px 16px 0;
			font: var(--B);
			color: var(--primary);
			img {
				height: 16px;
				width: 16px;
				filter: var(--filter-primary);
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
