import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onToggleDone?: (id: string, isDone: boolean) => void;
  onDelete?: (id: string, title: string) => void;
};

export function BoardCard({ id, title, isDone, onToggleDone, onDelete }: BoardCardProps) {
  return (
    <div className={isDone ? styles.isDone : styles.card}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => onToggleDone?.(id, !isDone)}
        className={styles.doneCheckbox}
        title={isDone ? "Отметить невыполненной" : "Отметить выполненной"}
      />
      <span className={styles.cardText}>{title}</span>
      {onDelete && (
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(id, title)}
          title="Удалить карточку"
        >
          ✕
        </button>
      )}
    </div>
  );
}