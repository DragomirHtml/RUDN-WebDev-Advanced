## Отчёт: KAN-4 — mark-card-done

### Что сделал агент

1. **Разведка проекта** — изучил структуру сервера и клиента, проверил типы, сервис, контроллер, роутер, middleware, компоненты клиента, конфигурацию прокси.

2. **OpenSpec-постановка** — создал изменение `mark-card-done` с четырьмя документами:
   - `proposal.md` — проблема, изменения, capabilities, impact
   - `specs/card-status.spec.md` — 7 требований с сценариями (WHEN/THEN)
   - `design.md` — обоснование PATCH /cards/:id, архитектура слоёв
   - `tasks.md` — 5 этапов, 21 задача

3. **Серверная реализация** — 4 файла изменено, 1 создан:
   - `server/middlewares/validateDone.ts` — новая валидация `typeof req.body.isDone !== "boolean"` → 400
   - `server/services/cards.service.ts` — добавлена `toggleCardDone(id, isDone): Card | null`
   - `server/controllers/cards.controller.ts` — добавлена `toggleDone(req, res)`, решает 200/404
   - `server/routes/cards.router.ts` — добавлен `PATCH /cards/:id`
   - `server/index.ts` — добавлен `express.json()`

4. **Клиентская реализация** — 4 файла изменено, 1 создан:
   - `client/src/api/cards.ts` — добавлена `toggleCardDone(id, isDone)`
   - `client/src/components/BoardCard/BoardCard.tsx` — добавлен чекбокс + пропс `onToggleDone`
   - `client/src/App.tsx` — добавлена `toggleMutation` с `invalidateQueries`
   - `client/src/components/BoardColumn/BoardColumn.tsx` — проброс `onToggleDone`
   - `client/src/components/BoardCard/BoardCard.module.css` — стили чекбокса
   - `client/src/types/card.ts` — создан (тип импортировался, но файла не было)

5. **Тестирование** — проверил все эндпоинты через `Invoke-WebRequest`:
   - GET /cards → 200, 4 карточки
   - POST /cards → 201, создана карточка
   - PATCH /cards/:id с `isDone: true` → 200
   - PATCH /cards/:id с `isDone: false` → 200
   - PATCH с невалидным `isDone: "yes"` → 400
   - PATCH для несуществующего id → 404
   - Vite-прокси `/api/*` → 200

6. **Сборка** — `tsc -b && vite build` прошла без ошибок

### Что делал человек

- Проводил обзор кода и валидацию архитектуры
- Принимал решения по API (PATCH /cards/:id)
- Запускал сервер через PowerShell (`npx tsx server/index.ts`)
- Открывал доску в браузере, проверял UI
- Запускал сборку клиента (`npm run build`)
- Согласовывал каждый этап перед переходом к следующему
- Запускал `openspec validate` и `openspec archive`

### Итог

Все 7 критериев задания KAN-4 выполнены. Серверная и клиентская части реализованы, тестирование пройдено, OpenSpec-документация согласована.
