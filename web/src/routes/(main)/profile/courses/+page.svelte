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
						<div class="border_date">
							<span class="naming">начало обучения</span>
							<span class="date">1 января 2024</span>
						</div>
						<div class="border_date">
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
		flex: 0 1 656px;
		display: flex;
		justify-content: space-between;
	}
	.course_info {
		flex: 0 1 340px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		h4 {
			font: var(--H4);
		}
		.dates {
			display: flex;
			gap: 62px;
			.border_date {
				display: flex;
				flex-direction: column;
			}
			.naming {
				font: var(--P3-extrabold);
			}
			.date {
				font: var(--P3-light);
			}
		}
	}
</style>
