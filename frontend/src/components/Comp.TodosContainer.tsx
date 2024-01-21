import { useEffect, useState } from "react";
import { TodosType } from "../../types/todos";

export default function CompTodosContainer() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [todosCount, setTodosCount] = useState<number>(0);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/get-todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.Data);
        setTodosCount(data.Count);
      })
      .catch((err) => console.log(err));
  };

  console.log("todos: ", todos);
  console.log("todosCount: ", todosCount);

  return <section>{import.meta.env.VITE_SERVER_URL}</section>;
}
