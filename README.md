# capydemia

Интерактивная образовательная платформа.

## Разработка

Для разработки используется технология devcontainer'ов.

Запуск dev-сервера производится разработчиком через CLI, сопутствующие сервисы
запускаются автоматически при запуске devcontainer'а.

### Авторизация

seed-скрипты создают следующие аккаунты:

| email                | Пароль   | Комментарий           |
| -------------------- | -------- | --------------------- |
| student@capydemia.ru | password | Аккаунт студента      |
| teacher@capydemia.ru | password | Аккаунт преподавателя |

### Сервисы

- dev-сервер: [localhost:3000](http://localhost:3000)
- dbgate: [admin.localhost:3000/db](http://admin.localhost:3000/db)

### CLI

- Запуск dev-сервера: `npm run dev`
- Проверка кода: `npm run check`
- Форматирование кода: `npm run format`
- БД:
  - Миграции:
    - Запуск одной миграции: `npm run db migrate up`
    - Отмена одной миграции: `npm run db migrate down`
    - Запуск всех миграций: `npm run db migrate latest -- --all`
  - Обновление типов: `npm run db:infer`
  - Заполнение тестовыми данными: `npm run db seed run`
