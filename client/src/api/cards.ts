import type { Card } from "../types/card";

export async function fetchCards(): Promise<Card[]> {
  const response = await fetch("/api/cards");
  if (!response.ok) throw new Error("Не удалось загрузить карточки");
  return response.json();
}

export async function createCard(title: string): Promise<Card> {
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isDone: false, isUrgent: false }),
  });
  if (!response.ok) throw new Error("Не удалось создать карточку");
  return response.json();
}

export async function deleteCard(id: string): Promise<void> {
  const response = await fetch(`/api/cards/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Не удалось удалить карточку");
}

export async function toggleCardDone(id: string, isDone: boolean): Promise<Card> {
  const response = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone }),
  });
  if (!response.ok) throw new Error("Не удалось обновить статус карточки");
  return response.json();
}
