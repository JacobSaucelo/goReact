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
    const isFormValid = Boolean(
      formData.Title &&
        formData.Description &&
        formData.DueDate &&
        formData.Priority &&
        formData.Status
    );

    if (isFormValid) {
      console.log("VALID");
      await fetch(import.meta.env.VITE_SERVER_URL + "/add-todo", {
        method: "POST",
        body: JSON.stringify({
          ID: "86",
          Title: formData.Title,
          Description: formData.Description,
          DueDate: date,
          UpdatedDate: null,
          Priority: formData.Priority,
          Status: formData.Status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("ADD DATA: ", data);
          setTodos((prevState) => [...prevState, data.Data]);
          setTodosCount(todosCount + 1);
        })
        .catch((err) => console.log("error: ", err));
    } else {
      console.log("NOT-VALID formData: ", formData, "| dataData: ", date);
    }
  };

  const handleUpdate = async (formData: TodosType, newdate: Date) => {
    const isFormValid = Boolean(
      formData.Title &&
        formData.Description &&
        formData.DueDate &&
        formData.Priority &&
        formData.Status
    );

    console.log(
      "date",
      JSON.stringify({
        ID: formData.ID,
        Title: formData.Title,
        Description: formData.Description,
        DueDate: newdate,
        UpdatedDate: Date.now(),
        Priority: formData.Priority,
        Status: formData.Status,
      })
    );

    if (isFormValid) {
      console.log("VALID");
      await fetch(import.meta.env.VITE_SERVER_URL + "/update-todo", {
        method: "POST",
        body: JSON.stringify({
          ID: formData.ID,
          Title: formData.Title,
          Description: formData.Description,
          DueDate: newdate,
          UpdatedDate: Date.now(),
          Priority: formData.Priority,
          Status: formData.Status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA: ", data);

          const updateTodos = todos.map((existingTodo) =>
            existingTodo.ID === formData.ID
              ? { ...formData, DueDate: newdate }
              : existingTodo
          );

          setTodosCount(todosCount + 1);
          setTodos(updateTodos);
        })
        .catch((err) => console.log("error: ", err));
    } else {
      console.log("NOT-VALID formData: ", formData, "| dataData: ", date);
    }
  };

  return (
    <section>
      <article className="mt-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Total Todos: {todosCount}</h1>

        <CompAddTodo handlePost={handlePost} date={date} setDate={setDate} />
      </article>

      <hr className="my-2" />

      <CompDisplayTodos
        todos={todos}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </section>
  );
}
