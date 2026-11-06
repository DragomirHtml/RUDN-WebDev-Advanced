## Tasks: mark-card-done

### 1. Подготовка OpenSpec

- [x] 1.1 Создать изменение `mark-card-done` через `openspec new change "mark-card-done"`
- [x] 1.2 Написать `proposal.md` — Why, What Changes, Capabilities, Impact
- [x] 1.3 Написать `specs/card-status.spec.md` — требования с сценариями
- [x] 1.4 Написать `design.md` — обоснование выбора PATCH /cards/:id, архитектура слоёв

### 2. Серверная реализация

- [x] 2.1 Создать `server/middlewares/validateDone.ts` — проверка `typeof req.body.isDone === "boolean"`, возврат 400 при ошибке
- [x] 2.2 Добавить функцию `toggleCardDone(id: string, isDone: boolean): Card | null` в `server/services/cards.service.ts` — поиск по id, обновление isDone, возврат обновлённого объекта или null
- [x] 2.3 Добавить функцию `toggleDone(req: Request, res: Response)` в `server/controllers/cards.controller.ts` — извлечение `req.params.id` и `req.body.isDone`, вызов сервиса, возврат 200 или 404
- [x] 2.4 Добавить маршрут `cardsRouter.patch("/cards/:id", validateDone, toggleDone)` в `server/routes/cards.router.ts`

### 3. Клиентская реализация

- [x] 3.1 Добавить функцию `toggleCardDone(id: string, isDone: boolean): Promise<Card>` в `client/src/api/cards.ts`
- [x] 3.2 Добавить пропс `onToggleDone` в `BoardCard.tsx`, элемент управления (чекбокс/кнопка) для переключения isDone
- [x] 3.3 Добавить CSS-стиль для элемента управления в `BoardCard.module.css` (опционально)
- [x] 3.4 Добавить мутацию `useMutation` в `App.tsx` с `invalidateQueries({ queryKey: ["cards"] })`
- [x] 3.5 Пробросить колбэк `onToggleDone` через `BoardColumn.tsx` в `BoardCard.tsx`

### 4. Тестирование

- [x] 4.1 Проверить, что `PATCH /cards/:id` с `isDone: true` отмечает карточку выполненной — Invoke-WebRequest вернул 200 и обновлённый объект
- [x] 4.2 Проверить, что `PATCH /cards/:id` с `isDone: false` снимает отметку — Invoke-WebRequest вернул 200 и `isDone: false`
- [x] 4.3 Проверить, что `PATCH /cards/:id` с небулевым `isDone` возвращает 400 — код 400 через middleware
- [x] 4.4 Проверить, что `PATCH /cards/:id` для несуществующей карточки возвращает 404 — код 404 из контроллера
- [x] 4.5 Проверить, что после обновления страницы (F5) состояние карточки сохраняется — GET /cards возвращает актуальный isDone
- [x] 4.6 Проверить, что фильтр «Скрыть выполненные» работает с новыми отметками — BoardColumn фильтрует по `!card.isDone`
- [x] 4.7 Проверить, что существующие эндпоинты (GET, POST, DELETE) продолжают работать — GET /cards вернул 200, POST /cards вернул 201

### 5. Отчёт и архивация

- [ ] 5.1 Написать `report.md` — что сделал агент, что человек правил руками
- [ ] 5.2 Отправить ветку `feature/mark-card-done` в удалённый репозиторий
- [ ] 5.3 Открыть merge request из `feature/mark-card-done` в `main`
- [ ] 5.4 Архивировать изменение через `openspec archive`
