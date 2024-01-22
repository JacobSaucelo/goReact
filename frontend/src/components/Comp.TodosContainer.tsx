import { useEffect, useState } from "react";
import { TodosType } from "../../types/todos";
import CompDisplayTodos from "./Comp.DisplayTodos";
import CompAddTodo from "./Comp.AddTodo";

export default function CompTodosContainer() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [todosCount, setTodosCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [date, setDate] = useState<Date>();

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

  const handlePost = async (formData: TodosType) => {
    // const isFormValid = Object.values(formData).every(
    //   (value) => value.trim() !== ""
    //   );
    const isFormValid = Boolean(
      formData.Title &&
        formData.Description &&
        formData.DueDate &&
        formData.Priority &&
        formData.Status
    );

    if (isFormValid) {
      console.log("VALID formData: ", formData, "| dataData: ", date);
    } else {
      console.log("NOT-VALID formData: ", formData, "| dataData: ", date);
    }

    // await fetch(import.meta.env.VITE_SERVER_URL + "/add-todo", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     ID: "86",
    //     Title: "jacob",
    //     Description: "description",
    //     DueDate: date,
    //     // DueDate:  new Date().toISOString(),
    //     UpdatedDate: null,
    //     Priority: 1,
    //     Status: 1,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setTodos((prevState) => [...prevState, data.Data]);
    //     setTodosCount(todosCount + 1);
    //     console.log("data: ", data);
    //   })
    //   .catch((err) => console.log("error: ", err));
  };

  return (
    <section>
      <article className="mt-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Total Todos: {todosCount}</h1>

        <CompAddTodo handlePost={handlePost} date={date} setDate={setDate} />
      </article>

      <hr className="my-2" />

      <CompDisplayTodos todos={todos} handleDelete={handleDelete} />
    </section>
  );
}
