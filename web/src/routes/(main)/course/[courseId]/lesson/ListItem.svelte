<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let kind: "module" | "lesson";
	export let status: "student" | "teacher" = "student";
	export let current: boolean;
	export let id: number;
	export let name: string;
	export let href: string = "";

	let editable = false;
	let input: HTMLInputElement;

	function Edit() {
		editable = true;
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 0);
	}

	function handleBlur() {
		editable = false;
		dispatch("change");
	}

	function Delete() {
		dispatch("delete");
	}
</script>

<div class="list_item">
	{#if status === "student"}
		{#if kind === "module"}
			<div class="module_header" class:current>
				<button class="module_button">
					<span>Модуль {id + 1}. {name}</span>
				</button>
			</div>
		{:else}
			<div class="lesson_header" class:current>
				<a {href}>
					Урок {id + 1}. {name}"
				</a>
			</div>
		{/if}
	{:else if kind === "module"}
		<div class="module_header" class:current>
			{#if editable === false}
				<button class="module_button">
					<span>Модуль {id + 1}. {name}</span>
				</button>
			{:else}
				<div class="module_button">
					<span>Модуль {id + 1}. </span>
					<input bind:this={input} bind:value={name} on:blur={handleBlur} />
				</div>
			{/if}
			<div class="edit_buttons">
				<button class="edit_name" on:click={Edit}>
					<img src="/icons/PencilSimple-32px.svg" alt="" />
				</button>
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
		</div>
	{:else}
		<div class="lesson_header" class:current>
			{#if editable === false}
				<a {href} class="lesson_link">
					<span>Урок {id + 1}. {name}</span>
				</a>
			{:else}
				<div class="lesson_link">
					<span>Урок {id + 1}. </span>
					<input bind:this={input} bind:value={name} on:blur={handleBlur} />
				</div>
			{/if}

			<div class="edit_buttons">
				<button class="edit_name" on:click={Edit}>
					<img src="/icons/PencilSimple-32px.svg" alt="" />
				</button>
				<button class="delete" on:click={Delete}>
					<img src="/icons/Trash-32px.svg" alt="" />
				</button>
			</div>
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

	.module_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		&:focus-within,
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
		&:not(:focus-within, .current) > .module_header:hover {
			span {
				color: var(--secondary);
			}
		}
	}

	.lesson_header {
		display: flex;
		align-items: center;
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
		}
	}
</style>
