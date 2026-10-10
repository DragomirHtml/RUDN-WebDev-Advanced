import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onDelete?: (id: string, title: string) => void;
};

export function BoardCard({ id, title, isDone, onDelete }: BoardCardProps) {
  return (
    <div className={isDone ? styles.isDone : styles.card}>
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