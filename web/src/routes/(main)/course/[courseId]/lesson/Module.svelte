<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import * as m from "$lib/models";
	import AddItem from "./[lessonId]/AddItem.svelte";
	import Confirm from "$lib/components/Confirm.svelte";
	const dispatch = createEventDispatcher();

	export let editable: boolean = false;
	export let id: number;
	export let expanded: number | null;
	export let module: m.UpdateModule;
	export let courseId: number;
	export let currentLessonId: number | null;
	export let isNew: boolean = false;

	let changingLesson: m.UpdateLesson;
	let isEditingModule = false;
	let delete_lesson: m.UpdateLesson;
	let input: HTMLInputElement;
	let inputLesson: HTMLInputElement;
	let new_lesson: m.UpdateLesson | null = null;
	let modal_show: boolean = false;
	let modal_text: string;

	//module management

	function Select() {
		dispatch("expanded");
	}
	if (isNew) {
		EditModule();
	}
	function EditModule() {
		isEditingModule = true;
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 0);
	}
	function handleBlur() {
		isEditingModule = false;
		dispatch("change");
	}
	function Delete() {
		dispatch("delete");
	}

	//lesson management

	async function addLesson() {
		new_lesson = {
			title: "",
			id: null
		};
		module.lessons.push(new_lesson);
		dispatch("refresh");
		EditLesson(new_lesson);
	}
	function EditLesson(lesson: m.UpdateLesson) {
		changingLesson = lesson;
		setTimeout(() => {
			if (inputLesson) {
				inputLesson.focus();
			}
		}, 0);
	}
	async function editLessonName(lesson: m.UpdateLesson) {
		if (lesson === new_lesson && lesson.title === "") {
			module.lessons = module.lessons.filter(x => x != new_lesson);
		} else {
			dispatch("save");
		}
		new_lesson = null;
	}
	function handleBlurLesson() {
		editLessonName(changingLesson);
		changingLesson = { id: -1, title: "" };
	}
	async function DeleteLesson(lesson: m.UpdateLesson) {
		module.lessons = module.lessons.filter(x => x !== lesson);
		dispatch("save");
		modal_show = false;
	}
</script>

<div
	class="module"
	class:expanded={module.lessons.some(x => x.id === currentLessonId) ||
		expanded === module.id}
	class:isEditingModule
>
	{#if modal_show}
		<div class="modal_confirm">
			<Confirm
				header="Подтвердите удаление"
				text="Вы хотите удалить {modal_text}?"
				on:confirm={() => DeleteLesson(delete_lesson)}
				on:cancel={() => (modal_show = false)}
			/>
		</div>
	{/if}
	<div class="module_header">
		{#if !editable}
			<div class="module_title">
				<button class="module_button" on:click={Select}>
					<span>Модуль {id + 1}. {module.title}</span>
				</button>
			</div>
		{:else if !isEditingModule && !isNew}
			<div class="module_title">
				<button class="module_button" on:click={Select}>
					<span>Модуль {id + 1}. {module.title}</span>
				</button>
			</div>
			<div class="edit_buttons">
				<button class="edit_name" on:click={EditModule}>
					<img src="/icons/PencilSimple-32px.svg" alt="" />
				</button>
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{:else}
			<div class="module_title">
				<input
					bind:this={input}
					bind:value={module.title}
					on:blur={handleBlur}
				/>
			</div>
			<div class="edit_buttons">
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{/if}
	</div>
	{#if module.lessons.some(x => x.id === currentLessonId) || expanded === module.id}
		<div class="lessons">
			{#each module.lessons as lesson, i}
				<div
					class="lesson"
					class:current={lesson.id === currentLessonId}
					class:isEditingLesson={lesson === changingLesson}
				>
					{#if !editable}
						<div class="lesson_title">
							<a
								href="/course/{courseId}/lesson/{lesson.id}"
								class="lesson_link"
							>
								Урок {i + 1}. {lesson.title}
							</a>
						</div>
					{:else if !(lesson === changingLesson) && !isNew}
						<div class="lesson_title">
							<a
								href="/course/{courseId}/lesson/{lesson.id}"
								class="lesson_link"
							>
								Урок {i + 1}. {lesson.title}
							</a>
						</div>
						<div class="edit_buttons">
							<button class="edit_name" on:click={() => EditLesson(lesson)}>
								<img src="/icons/PencilSimple-32px.svg" alt="" />
							</button>
							<button
								class="delete"
								on:click={() => {
									modal_show = true;
									delete_lesson = lesson;
									modal_text = `урок ${i + 1} "${lesson.title}"`;
								}}
							>
								<img src="/icons/Trash-32px.svg" alt="" />
							</button>
						</div>
					{:else}
						<div class="lesson_title">
							<input
								bind:this={inputLesson}
								bind:value={lesson.title}
								on:blur={handleBlurLesson}
							/>
						</div>
						<div class="edit_buttons">
							<button class="delete" on:click={() => DeleteLesson(lesson)}>
								<img src="/icons/Trash-32px.svg" alt="" />
							</button>
						</div>
					{/if}
				</div>
			{/each}
			{#if editable}
				<div class="add_module">
					<AddItem
						kind="lesson"
						text="Добавить урок"
						on:addLesson={addLesson}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	button {
		border: none;
		background-color: inherit;
	}
	input {
		color: var(--text);
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
			&:hover > img {
				filter: var(--filter-secondary);
			}
			&:active > img {
				filter: var(--filter-primary);
			}
		}
		.delete {
			&:hover > img {
				filter: var(--filter-error);
			}
			&:active > img {
				filter: var(--filter-primary);
			}
		}
	}
	.module {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;

		.module_header {
			height: 72px;
			display: flex;

			.module_title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100%;

				.module_button {
					width: 100%;
					height: 100%;
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
		}
		&.expanded {
			border: none;
			.module_header {
				background-color: var(--primary);
				color: var(--main-bg);
				border-radius: 8px 8px 0 0;
				border: none;
				.module_button > span {
					color: var(--main-bg);
				}
				.edit_buttons {
					button {
						img {
							filter: var(--filter-main-bg);
						}
						&:hover > img {
							filter: var(--filter-secondary);
						}
						&:active > img {
							filter: var(--filter-main-bg);
						}
					}
					.delete {
						&:hover > img {
							filter: var(--filter-error);
						}
						&:active > img {
							filter: var(--filter-main-bg);
						}
					}
				}
			}

			.lessons {
				display: flex;
				flex-direction: column;
				border: 1px solid var(--secondary);
				border-top: none;
				border-radius: 0 0 8px 8px;
				padding: 12px 0 12px 0;
			}
		}
		&:not(.expanded):hover {
			.module_header {
				.module_button {
					span {
						color: var(--secondary);
					}
				}
				.edit_buttons {
					button {
						img {
							filter: var(--filter-secondary);
						}
						&:hover > img {
							filter: var(--filter-primary);
						}
					}
					.delete {
						&:hover > img {
							filter: var(--filter-error);
						}
					}
				}
			}
		}
		&.isEditingModule > .module_header {
			height: 100%;
			display: flex;
			gap: 10px;
			padding: 12px 32px;
			.module_title {
				width: 100%;
				background-color: var(--main-bg);
				border-radius: 8px;
				padding: 14px 24px;

				input {
					background-color: inherit;
					color: var(--text);
					outline: none;
					border: none;
					border-radius: 8px;
					width: 100%;
				}
			}
			.edit_buttons {
				padding: initial;
			}
		}
		&:not(.expanded).isEditingModule > .module_header > .module_title {
			border: 1px solid var(--secondary);
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
	.lesson {
		height: 60px;
		display: flex;

		.lesson_title {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			border-radius: 8px;
			a {
				width: 100%;
				padding: 18px 0 18px 32px;
				font: var(--P1);
				color: var(--text);
				text-decoration: none;
			}
		}
		&.current {
			background-color: var(--secondary);
		}
		&:not(.current):hover {
			.lesson_title > a {
				color: var(--secondary);
			}
			.edit_buttons {
				button {
					img {
						filter: var(--filter-secondary);
					}
					&:hover > img {
						filter: var(--filter-primary);
					}
				}
				.delete {
					&:hover > img {
						filter: var(--filter-error);
					}
				}
			}
		}
		&.isEditingLesson {
			height: 100%;
			display: flex;
			gap: 10px;
			padding: 10px 32px;
			.lesson_title {
				width: 100%;
				background-color: var(--main-bg);
				border-radius: 8px;
				padding: 14px 24px;

				input {
					background-color: inherit;
					color: var(--text);
					outline: none;
					border: none;
					border-radius: 8px;
					width: 100%;
				}
			}
			.edit_buttons {
				padding: initial;
			}
		}
		&:not(.current).isEditingLesson > .lesson_title {
			border: 1px solid var(--secondary);
		}
	}
	.add_module {
		width: 100%;
	}
</style>
