## Design: mark-card-done

### 1. Выбор эндпоинта

**`PATCH /cards/:id`** — частичное обновление одного поля (`isDone`) конкретной карточки.

- **PATCH**, а не PUT, потому что меняется одно поле, а не вся карточка целиком.
- Параметризированный путь `:id` позволяет адресовать конкретную карточку.
- Путь `/cards/:id` не конфликтует с существующими маршрутами: `GET /cards`, `POST /cards`, `DELETE /card`.
- В роутере (`server/routes/cards.router.ts`) маршрут добавляется как `cardsRouter.patch("/cards/:id", validateDone, toggleDone)`. Так как роутер подключён в `server/index.ts` через `app.use(cardsRouter)` без префикса, фактический адрес — `/cards/:id`.

### 2. JSON-тело запроса

```json
{ "isDone": true }
```
или
```json
{ "isDone": false }
```

### 3. Валидация через middleware

Новый файл: `server/middlewares/validateDone.ts`.

Проверяет, что `req.body.isDone` существует и имеет тип `boolean`:

```ts
if (typeof req.body.isDone !== "boolean") {
    res.sendStatus(400);
    return;
}
next();
```

Если проверка не пройдена — `400 Bad Request`, контроллер не вызывается.
Используется тот же паттерн, что и существующий `checkCard.ts`.

### 4. Сервис (серверная логика)

Файл: `server/services/cards.service.ts` — добавление функции `toggleCardDone`.

Функция принимает `id: string` и `isDone: boolean`, ищет карточку по `id`, обновляет поле `isDone` и возвращает обновлённый объект `Card`. Если карточка не найдена — возвращает `null`.

- Не содержит `req`, `res`, `status`.
- Возвращаемый тип: `Card | null`.

### 5. Контроллер

Файл: `server/controllers/cards.controller.ts` — добавление функции `toggleDone`.

Получает `req.params.id` (из маршрута) и `req.body.isDone` (из тела запроса), вызывает `toggleCardDone(id, isDone)`.

- Если результат `null` — `res.sendStatus(404)`.
- Если результат — объект `Card` — `res.status(200).json(result)`.

Решение о статусе ответа принимает контроллер, сервис только сообщает факт.

### 6. Маршрут в роутере

Файл: `server/routes/cards.router.ts`.

Новая строка:
```ts
cardsRouter.patch("/cards/:id", validateDone, toggleDone);
```

Маршрут добавляется в конец файла после существующих маршрутов.

### 7. Обновление состояния на клиенте

Файл: `client/src/api/cards.ts` — добавление функции `toggleCardDone(id, isDone)`:

```ts
export async function toggleCardDone(id: string, isDone: boolean): Promise<Card> {
  const response = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone }),
  });
  if (!response.ok) throw new Error("Не удалось обновить статус карточки");
  return response.json();
}
```

Файл: `client/src/components/BoardCard/BoardCard.tsx` — добавление пропса `onToggleDone` и кнопки/чекбокса для переключения.

Файл: `client/src/App.tsx` — создание мутации через `useMutation` с `invalidateQueries` для обновления списка карточек.

Файл: `client/src/components/BoardColumn/BoardColumn.tsx` — проброс колбэка `onToggleDone` в `BoardCard`.

### 8. Сохранение состояния на сервере

Состояние хранится в массиве `cards` в `server/services/cards.service.ts`. При обновлении страницы клиент делает `GET /api/cards` (`fetchCards`), который возвращает весь массив с актуальными значениями `isDone`. React Query автоматически подтягивает данные при монтировании компонента `App`.

### 9. Архитектурные ограничения

- Сервис не содержит HTTP-зависимостей (`req`, `res`, `status`).
- Валидация — в middleware, не в контроллере.
- Решение о `404` — в контроллере, сервис только сообщает `null`.
- Клиент меняет не более двух-трёх файлов (api/cards.ts, BoardCard.tsx, BoardCard.module.css).
- Существующие функции (`getAllCards`, `createCard`, `deleteCard`, `get`, `post`, `remove`) не переписываются.
