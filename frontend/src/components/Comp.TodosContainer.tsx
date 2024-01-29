import { useEffect, useState } from "react";
import { PriorityType, StatusType, TodosType } from "../../types/todos";
import CompDisplayTodos from "./Comp.DisplayTodos";
import CompAddTodo from "./Comp.AddTodo";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompTodosContainer() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [todosCount, setTodosCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/get-todos")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setTodos(data.Data);
        setTodosCount(data.Count);
      })
      .catch((err) => {
        console.log("Error fetching todos");
        setIsLoading(false);
        setError(err);
      });
  };

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error fetching</div>;

  return (
    <section>
      <article className="mt-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Total Todos: {todosCount}</h1>

        <Button size="sm" variant="secondary" asChild>
          <Link to="/add-todo">
            <Plus className="mr-2 h-4 w-4" />
            Create New Task
          </Link>
        </Button>
      </article>

      <CompDisplayTodos todos={todos} />
    </section>
  );
}
