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

    if (isFormValid) {
      console.log(
        "valid input: ",
        JSON.stringify({
          ID: formData.ID,
          Title: formData.Title,
          Description: formData.Description,
          DueDate: newdate,
          UpdatedDate: Date.now(),
          Priority: formData.Priority as PriorityType,
          Status: formData.Status as StatusType,
        })
      );

      console.log("VALID");
      await fetch(import.meta.env.VITE_SERVER_URL + "/update-todo", {
        method: "POST",
        body: JSON.stringify({
          ID: formData.ID,
          Title: formData.Title,
          Description: formData.Description,
          DueDate: newdate,
          UpdatedDate: new Date(),
          Priority: formData.Priority as PriorityType,
          Status: formData.Status as StatusType,
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

  const updateTest = async () => {
    const newDate = new Date();

    const value: TodosType = {
      ID: "1705965979117515800",
      Title: "update",
      Description: "update",
      DueDate: new Date(),
      UpdatedDate: newDate,
      Priority: Number("2") as PriorityType,
      Status: Number("2") as StatusType,
    };

    await fetch(import.meta.env.VITE_SERVER_URL + "/update-todo", {
      method: "POST",
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => console.log("update test: ", data))
      .catch((err) => console.log("err: ", err));
  };

  const getProjTest = async () => {
    await fetch(
      import.meta.env.VITE_SERVER_URL + "/get-project/" + "1705965979117515800"
    )
      .then((res) => res.json())
      .then((data) => console.log("update test: ", data))
      .catch((err) => console.log("err: ", err));
  };

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
