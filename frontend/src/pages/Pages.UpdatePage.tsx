import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TodosType } from "types/todos";

export default function PagesUpdatePage() {
  let { id } = useParams();

  const [date, setDate] = useState<Date>();
  const [formTodo, setFormTodo] = useState<TodosType>({
    ID: "",
    Title: "",
    Description: "",
    DueDate: new Date(),
    Priority: 1,
    Status: 1,
  });

  useEffect(() => {
    handleFetchUpdate();
  }, []);

  const handleFetchUpdate = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "/get-project/" + id)
      .then((res) => res.json())
      .then((data) => {
        setFormTodo(data.Data);
      })
      .catch((err) => console.log(err));
  };

  console.log("formTodo: ", formTodo);
  console.log("date: ", date);

  return (
    <section>
      <h1>{id}</h1>

      <p>ID: {formTodo.ID ? "meron" : "wala"}</p>
      <p>Title: {formTodo.Title}</p>
      <p>Description: {formTodo.Description}</p>
      <p>Priority: {formTodo.Priority}</p>
      <p>Status: {formTodo.Status}</p>
    </section>
  );
}
