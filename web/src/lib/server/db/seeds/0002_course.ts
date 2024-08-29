import { sql, type Kysely } from "kysely";
import type { DB } from "../types";
import { resetSequence } from "../utils";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = ["courseEnrollment", "lesson", "module", "course"] as const;
	for (const table of tables) {
		await db.deleteFrom(table).execute();
		await resetSequence(db, table);
	}

	await db
		.insertInto("course")
		.values([
			{ title: "Капибаза", description: "Курс о капибарах, базовый уровень" }
		])
		.execute();
	await db
		.insertInto("module")
		.values([
			{ title: "Введение", courseId: 1, order: 1 },
			{ title: "Капибары и культура", courseId: 1, order: 2 },
			{ title: "Капибароводство", courseId: 1, order: 3 },
			{ title: "Капибароводоминация", courseId: 1, order: 4 },
			{
				title:
					"Исследования бб отсутствии смысла жизни без капибар, а также рецепт кокосового молока",
				courseId: 1,
				order: 5
			}
		])
		.execute();

	const content = {
		time: 1723145720,
		blocks,
		version: "2.8.1"
	};
	await db
		.insertInto("lesson")
		.values([
			{ moduleId: 1, order: 1, title: "Капибары", content },
			{ moduleId: 2, order: 1, title: "Капибары", content },
			{ moduleId: 3, order: 1, title: "Капибары", content },
			{ moduleId: 4, order: 1, title: "Капибары", content },
			{ moduleId: 5, order: 1, title: "Капибары", content },
			{ moduleId: 5, order: 2, title: "Капибары 2", content }
		])
		.execute();
	await db
		.insertInto("courseEnrollment")
		.values({ userId: 1, courseId: 1 })
		.execute();
}

const blocks = [
	{
		id: "a7p9gX2vNk",
		type: "header",
		data: {
			text: "Капибары: Гиганты среди грызунов",
			level: 1
		}
	},
	{
		id: "b3k4Qz6pLp",
		type: "paragraph",
		data: {
			text: "Капибары (Hydrochoerus hydrochaeris) — это самые крупные грызуны на планете. Их размеры могут достигать до 1,3 метра в длину и 50-70 сантиметров в высоту, а вес варьируется от 35 до 66 килограммов. Капибары обитают в Южной Америке, особенно на болотистых равнинах и вдоль рек, что объясняет их тесную связь с водой."
		}
	},
	{
		id: "c8n2Lw5vRm",
		type: "header",
		data: {
			text: "Полуводный образ жизни",
			level: 2
		}
	},
	{
		id: "d9k7Vz8rJk",
		type: "paragraph",
		data: {
			text: "Эти крупные грызуны отлично адаптированы к жизни в водной среде. Капибары обладают перепончатыми лапами, что позволяет им быстро и ловко плавать. Они часто проводят время в воде, особенно в жаркую погоду, чтобы охладиться и укрыться от хищников. Их ноздри и глаза расположены на верхней части головы, что позволяет им оставаться почти полностью под водой, наблюдая за окружающей средой."
		}
	},
	{
		id: "e2t5Qx1pZb",
		type: "header",
		data: {
			text: "Общество капибар",
			level: 2
		}
	},
	{
		id: "f1j6Sy4kVl",
		type: "paragraph",
		data: {
			text: "Капибары — социальные животные, они живут стадами, состоящими из 10-20 особей, хотя иногда их количество может доходить до 100. В группе обычно есть доминирующий самец, несколько самок и их потомство. Общение внутри стаи происходит через различные звуки, такие как свист, рычание и даже лай, а также с помощью запахов."
		}
	},
	{
		id: "g5w2Qv8nXk",
		type: "header",
		data: {
			text: "Питание и пищевые привычки",
			level: 2
		}
	},
	{
		id: "h3n7Uz6pRm",
		type: "paragraph",
		data: {
			text: "Основу рациона капибар составляют травы, водные растения, фрукты и даже кора деревьев. Они могут потреблять до 3 килограммов пищи в день. Капибары, как и многие другие грызуны, практикуют копрофагию — они едят свой собственный помет, чтобы лучше усваивать питательные вещества из пищи."
		}
	},
	{
		id: "i6t9Qy2kWb",
		type: "header",
		data: {
			text: "Приспособления к выживанию",
			level: 2
		}
	},
	{
		id: "j4m1Vx3rZl",
		type: "paragraph",
		data: {
			text: "Одним из ключевых аспектов успешного выживания капибар является их удивительная способность к регенерации зубов. Их зубы постоянно растут, что позволяет животным пережёвывать жесткую растительность без риска стереть их полностью. Кроме того, благодаря густой и жесткой шерсти, капибары прекрасно защищены от насекомых и мелких паразитов."
		}
	},
	{
		id: "k9n8Ty6lXk",
		type: "header",
		data: {
			text: "Взаимоотношения с человеком",
			level: 2
		}
	},
	{
		id: "l2j3Sz5pWm",
		type: "paragraph",
		data: {
			text: "Капибары издревле были частью культуры местных народов Южной Америки. Их ценили за мясо и шкуру. В некоторых странах капибары даже приручены и содержатся как домашние животные благодаря своему спокойному и дружелюбному нраву. Однако в некоторых регионах капибары могут рассматриваться как вредители из-за того, что они поедают сельскохозяйственные культуры."
		}
	},
	{
		id: "m7p4Xv9rKm",
		type: "header",
		data: {
			text: "Заключение",
			level: 2
		}
	},
	{
		id: "n5w6Qy7kZl",
		type: "paragraph",
		data: {
			text: "Капибары — это уникальные животные, которые успешно адаптировались к жизни на земле и в воде. Их социальное поведение, способность к адаптации и мирный характер делают их одними из самых интересных представителей животного мира. Их изучение помогает лучше понять сложные экосистемы Южной Америки и взаимоотношения между разными видами в природных условиях."
		}
	}
];
