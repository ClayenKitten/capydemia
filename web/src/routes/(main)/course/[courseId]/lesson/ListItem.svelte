<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let kind: "module" | "lesson";
	export let editable: boolean = false;
	export let current: boolean;
	export let id: number;
	export let name: string;
	export let href: string = "";
	export let isNew: boolean | undefined = false;

	let isEditing = false;
	let input: HTMLInputElement;

	if (isNew) {
		console.log("new");
		Edit();
	}

	function Edit() {
		console.log("editing");
		isEditing = true;
		dispatch("editing");
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 0);
	}

	function handleBlur() {
		isEditing = false;
		dispatch("change");
	}

	function Delete() {
		dispatch("delete");
	}
</script>

{#if kind === "module"}
	<div class="module" class:current class:isEditing>
		{#if !editable}
			<div class="module_header">
				<button class="module_button">
					<span>Модуль {id + 1}. {name}</span>
				</button>
			</div>
		{:else if !isEditing && !isNew}
			<div class="module_header">
				<button class="module_button">
					<span>Модуль {id + 1}. {name}</span>
				</button>
			</div>
			<div class="edit_buttons">
				<button class="edit_name" on:click={Edit}>
					<img src="/icons/PencilSimple-32px.svg" alt="" />
				</button>
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{:else}
			<div class="module_header">
				<input bind:this={input} bind:value={name} on:blur={handleBlur} />
			</div>
			<div class="edit_buttons">
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{/if}
	</div>
{:else if kind === "lesson"}
	<div class="lesson" class:current class:isEditing>
		{#if !editable}
			<div class="lesson_header">
				<a {href} class="lesson_link">
					Урок {id + 1}. {name}
				</a>
			</div>
		{:else if !isEditing && !isNew}
			<div class="lesson_header">
				<a {href} class="lesson_link">
					Урок {id + 1}. {name}
				</a>
			</div>
			<div class="edit_buttons">
				<button class="edit_name" on:click={Edit}>
					<img src="/icons/PencilSimple-32px.svg" alt="" />
				</button>
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{:else}
			<div class="lesson_link">
				<input bind:this={input} bind:value={name} on:blur={handleBlur} />
			</div>
			<div class="edit_buttons">
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		{/if}
	</div>
{/if}

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
	.module,
	.lesson {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: var(--main-bg);
	}
	.module {
		height: 72px;
		border: 1px solid var(--secondary);
		border-radius: 8px;

		.module_header {
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
		&:not(.isEditing):focus-within,
		&.current {
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
		&:not(:focus-within, .current):hover {
			span {
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

		&.editable {
			height: 100%;
			display: flex;
			gap: 10px;
			padding: 12px 32px;
			.module_header {
				display: inline-flex;
				flex-wrap: wrap;
				align-items: center;
				width: 100%;
				background-color: var(--main-bg);
				border-radius: 8px;
				border: 1px solid var(--secondary);
				padding: 14px 24px;
				span {
					color: var(--text);
				}
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
	}

	.lesson {
		.lesson_link {
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
			.lesson_link {
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
		&.editable {
			height: 100%;
			display: flex;
			gap: 10px;
			padding: 10px 32px;
			.lesson_link {
				display: inline-flex;
				flex-wrap: wrap;
				align-items: center;
				width: 100%;
				background-color: var(--main-bg);
				border-radius: 8px;
				border: 1px solid var(--secondary);
				padding: 14px 24px;
				span {
					color: var(--text);
				}
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
	}
</style>
