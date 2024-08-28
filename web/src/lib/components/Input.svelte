<script lang="ts">
	export let name: string = "";
	export let placeholder: string;
	export let value: string | null | undefined;
	export let type: "text" | "email" | "password" = "text";

	export let invalid: boolean = false;
	export let required: boolean = false;
	export let minlength: number | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;

	export let autocomplete: string | undefined = undefined;

	let input: HTMLInputElement;
	$: input?.setCustomValidity(invalid ? "invalid" : "");
</script>

<section>
	<span>{name}</span>
	{#if type === "text"}
		<input
			type="text"
			bind:value
			bind:this={input}
			{placeholder}
			{required}
			{minlength}
			{maxlength}
			{pattern}
			{autocomplete}
			on:input
			on:change
		/>
	{:else if type === "email"}
		<input
			type="email"
			bind:value
			bind:this={input}
			{placeholder}
			{required}
			{minlength}
			{maxlength}
			{pattern}
			{autocomplete}
			on:input
			on:change
		/>
	{:else if type === "password"}
		<input
			type="password"
			bind:value
			bind:this={input}
			{placeholder}
			{required}
			{minlength}
			{maxlength}
			{pattern}
			{autocomplete}
			on:input
			on:change
		/>
	{/if}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	span {
		font: var(--P2);
	}
	input {
		height: 52px;
		width: 292px;
		color: var(--text);
		background: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		font: var(--P1);
		padding: 14px 24px 14px 24px;
		&::placeholder {
			color: var(--text-note);
			font: var(--P1-bold);
		}
		&:invalid {
			border-color: var(--error);
		}
	}
</style>
