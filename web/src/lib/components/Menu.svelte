<script lang="ts">
	import { page } from "$app/stores";

	export let text: string;
	export let path: string;
	export let img: string;
</script>

<a class:selected={$page.url.pathname === path} href={path}>
	<img src={img} alt="" />
	<span>{text}</span>
</a>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 16px 32px 16px 32px;
		background-color: var(--main-bg);
		font: var(--B);
		color: var(--primary);
		text-decoration: none;

		&:hover {
			color: var(--secondary);
		}

		&:active, &.selected{
			color: var(--main-bg);
			background-color: var(--primary);
			img {
				filter: invert(100%) sepia(95%) saturate(18%) hue-rotate(338deg)
					brightness(106%) contrast(104%);
			}
		}
	}
	
</style>
