import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState<any>([]);
  const [todosCount, setTodosCount] = useState<number>(0);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.Data);
        setTodosCount(data.Count);
      })
      .catch((err) => console.log(err));
  };

  const handlePost = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "add-todo", {
      method: "POST",
      body: JSON.stringify({
        ID: 2,
        Title: "jacob",
        Description: "description",
        DueDate: new Date().toISOString(),
        Priority: 1,
        Status: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("data: ", data))
      .catch((err) => console.log("error: ", err));
  };

  return (
    <main>
      <section>heelo wold</section>
      <button onClick={handlePost}>submit test</button>

      <h1>SERVER: {import.meta.env.VITE_SERVER_URL}</h1>

      <h1>overall todos: {todosCount}</h1>
      <section>
        {todos.map((todo: any) => (
          <div>
            <p>{todo.ID}</p>
            <p>{todo.Title}</p>
            <p>{todo.Description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
