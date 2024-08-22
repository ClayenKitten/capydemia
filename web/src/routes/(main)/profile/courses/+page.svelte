<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<header>
	<h2>Мои курсы</h2>
</header>
<section class="courses">
	{#each data.courses as course}
		<div class="course">
			<div class="course_img">
				<img src="/logo.svg" alt="course" />
			</div>
			<div class="info">
				<div class="course_info">
					<div class="course_heading">
						<h4>{course.title}</h4>
					</div>
					<div class="dates">
						<div class="start_date">
							<span class="naming">начало обучения</span>
							<span class="date">1 января 2024</span>
						</div>
						<div class="finish_date">
							<span class="naming">окончание обучения</span>
							<span class="date">1 января 2025</span>
						</div>
					</div>
				</div>
				<div class="progress">
					<img src="/progress.svg" alt="progress" />
				</div>
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	header {
		padding: 0 16px 0 16px;
		color: var(--text);

		h2 {
			font: var(--H2);
		}
	}
	.courses {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.course {
		background-color: var(--main-bg);
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 32px;
		display: flex;
		gap: 40px;
	}
	.info {
		display: flex;
		justify-content: space-between;
		//gap: 228px;
	}
	.course_info {
	}
</style>
