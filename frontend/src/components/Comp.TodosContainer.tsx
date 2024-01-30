import { useEffect, useState } from "react";
import { PriorityType, StatusType, TodosType } from "../../types/todos";
import CompDisplayTodos from "./Comp.DisplayTodos";
import CompAddTodo from "./Comp.AddTodo";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/tableData/data-table";
import { columns } from "@/tableData/columns";

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
      <DataTable columns={columns} data={todos} />
    </section>
  );
}
