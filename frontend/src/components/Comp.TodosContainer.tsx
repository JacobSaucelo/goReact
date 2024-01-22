import { useEffect, useState } from "react";
import { TodosType } from "../../types/todos";
import { Plus } from "lucide-react";
import CompDisplayTodos from "./Comp.DisplayTodos";
import { Button } from "@/components/ui/button";

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

  const handleDelete = async (id: string) => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/delete-todo", {
      method: "DELETE",
      body: JSON.stringify({
        ID: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);

        setTodos(todos.filter((idD) => idD.ID !== id));
        setTodosCount(todosCount - 1);
      })
      .catch((err) => console.log("error: ", err));
  };

  const handlePost = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/add-todo", {
      method: "POST",
      body: JSON.stringify({
        ID: "2",
        Title: "jacob",
        Description: "description",
        DueDate: new Date().toISOString(),
        UpdatedDate: null,
        Priority: 1,
        Status: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prevState) => [...prevState, data.Data]);
        setTodosCount(todosCount + 1);

        console.log("data: ", data);
      })

      .catch((err) => console.log("error: ", err));
  };

  return (
    <section>
      <article className="mt-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Total Todos: {todosCount}</h1>

        <Button size="sm" variant="secondary" onClick={handlePost}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </article>

      <hr className="my-2" />

      <CompDisplayTodos todos={todos} handleDelete={handleDelete} />
    </section>
  );
}
