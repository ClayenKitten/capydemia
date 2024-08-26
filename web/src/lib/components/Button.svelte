<script lang="ts">
	export let kind: "primary" | "secondary" | "text" = "primary";
	export let text: string;
	export let disabled: boolean = false;
</script>

<button
	class:primary={kind === "primary"}
	class:secondary={kind === "secondary"}
	class:text={kind === "text"}
	on:click
	{disabled}
>
	<span>
		{text}
	</span>

	{#if kind === "text"}
		<img src="/icons/Arrow.svg" alt="button" class="arrow" />
	{/if}
</button>

<style lang="scss">
	button {
		height: 52px;
		padding: 14px 32px 14px 32px;
		border-radius: 8px;
		align-content: center;
		font: var(--B);

		&.primary {
			color: var(--main-bg);
			background-color: var(--primary);
			border: none;

			&:hover {
				color: var(--text);
				background-color: var(--secondary);
			}

			&:focus {
				color: var(--main-bg);
				background-color: var(--primary);
			}

			&:disabled {
				color: var(--text-disabled);
				background-color: var(--text-note);
				cursor: not-allowed;
			}
		}
		&.secondary {
			color: var(--primary);
			background-color: var(--main-bg);
			border: 1px solid var(--primary);

			&:hover {
				color: var(--secondary);
				border-color: var(--secondary);
			}

			&:focus {
				color: var(--primary);
				border-color: var(--primary);
			}

			&:disabled {
				color: var(--text-note);
				border-color: var(--text-note);
				cursor: not-allowed;
			}
		}
		&.text {
			display: flex;
			align-items: center;
			gap: 10px;
			height: 24px;
			padding: 4px 0 4px 0;
			color: var(--text);
			background-color: var(--main-bg);
			border: none;

			& img {
				filter: invert(12%) sepia(32%) saturate(354%) hue-rotate(155deg)
					brightness(97%) contrast(101%);
			}

			&:hover {
				color: var(--primary);
				fill: var(--primary);
			}

			&:hover img {
				filter: invert(25%) sepia(60%) saturate(2103%) hue-rotate(179deg)
					brightness(99%) contrast(94%);
			}

			&:focus {
				color: var(--text);
			}

			&:focus img {
				filter: invert(12%) sepia(32%) saturate(354%) hue-rotate(155deg)
					brightness(97%) contrast(101%);
			}

			&:disabled {
				color: var(--text-note);
				cursor: not-allowed;
			}

			&:disabled img {
				filter: invert(82%) sepia(8%) saturate(41%) hue-rotate(316deg)
					brightness(87%) contrast(98%);
			}
		}
	}
</style>
