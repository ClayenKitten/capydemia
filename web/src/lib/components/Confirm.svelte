<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let header: string;
	export let text: string;
</script>

<div class="modal">
	<div class="header">
		<span>{header}</span>
	</div>
	<div class="content">
		<div class="text">
			<span>{text}</span>
		</div>
		<div class="buttons">
			<button class="confirm" on:click={() => dispatch("confirm")}>Да</button>
			<button class="cancel" on:click={() => dispatch("cancel")}>Нет</button>
		</div>
	</div>
</div>

<style lang="scss">
	.modal {
		display: flex;
		flex-direction: column;
		width: 396px;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12px 32px;
			background-color: var(--primary);
			color: var(--main-bg);
			font: var(--P1-extrabold);
			border-radius: 8px 8px 0 0;
		}
		.content {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 18px;
			background-color: var(--main-bg);
			border: 1px solid var(--secondary);
			border-top: none;
			border-radius: 0 0 8px 8px;
			padding: 18px 0;
			.text {
				width: 100%;
				font: var(--P1);
				padding: 0 32px;
				text-align: center;
			}
			.buttons {
				display: flex;
				gap: 48px;
				button {
					height: 40px;
					padding: 8px 32px 8px 32px;
					border-radius: 8px;
					align-content: center;
					font: var(--B);

					&.confirm {
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
					&.cancel {
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
				}
			}
		}
	}
</style>
