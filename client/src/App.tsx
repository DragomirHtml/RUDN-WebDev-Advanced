
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import styles from "./App.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCards, deleteCard, toggleCardDone } from "./api/cards";

function App() {
  const query = useQuery({ queryKey: ["cards"], queryFn: fetchCards });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) => toggleCardDone(id, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Удалить карточку "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleDone = (id: string, isDone: boolean) => {
    toggleMutation.mutate({ id, isDone });
  };

  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        {query.isLoading ? "Загружаемся" :

        <div className={styles.columns}>
          <BoardColumn
            cards={query.data ?? []}
            onToggleDone={handleToggleDone}
            onDelete={handleDelete}
          />
        </div>
        }
      </main>
    </div>
  );
}

export default App;
