<script lang="ts">
	export let placeholder: string;
	export let valid: boolean = false;
</script>

<input {placeholder} class:invalid={!valid} />

<style lang="scss">
	input {
		height: 52px;
		width: 292px;
		color: var(--text);
		background: var(--main-bg);
		border: 0.5px solid var(--secondary);
		border-radius: 8px;
		font: var(--P1);
		padding: 14px 24px 14px 24px;
	}
	::placeholder {
		color: var(--text-note);
		font: var(--P1-bold);
	}
	.invalid {
		border-color: var(--error);
	}
</style>
