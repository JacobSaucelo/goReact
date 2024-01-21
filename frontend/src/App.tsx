import CompTodosContainer from "./components/Comp.TodosContainer";

function App() {
  // const [todos, setTodos] = useState<any[]>([]);
  // const [todosCount, setTodosCount] = useState<number>(0);

  // useEffect(() => {
  //   handleFetch();
  // }, []);

  // const handleFetch = async () => {
  //   await fetch(import.meta.env.VITE_SERVER_URL + "/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodos(data.Data);
  //       setTodosCount(data.Count);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handlePost = async () => {
  //   await fetch(import.meta.env.VITE_SERVER_URL + "/add-todo", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       ID: "2",
  //       Title: "jacob",
  //       Description: "description",
  //       DueDate: new Date().toISOString(),
  //       UpdatedDate: null,
  //       Priority: 1,
  //       Status: 1,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("data: ", data))
  //     .catch((err) => console.log("error: ", err));
  // };

  // const handleDelete = async (id: number) => {
  //   await fetch(import.meta.env.VITE_SERVER_URL + "/delete-todo", {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       ID: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data: ", data);

  //       setTodos(todos.filter((idD) => idD.ID !== id));
  //       setTodosCount(todosCount - 1);
  //     })
  //     .catch((err) => console.log("error: ", err));
  // };

  // const handleUpdate = async (id: number) => {
  //   await fetch(import.meta.env.VITE_SERVER_URL + "update-todo", {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       ID: id,
  //       Title: "update",
  //       Description: "update",
  //       UpdatedDate: new Date().toISOString(),
  //       Priority: 3,
  //       Status: 3,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Update Data: ", data);
  //     })
  //     .catch((err) => console.log("error: ", err));
  // };

  return (
    <main>
      <CompTodosContainer />
      {/* <section>heelo wold</section>
      <button onClick={handlePost}>submit test</button>

      <h1>SERVER: {import.meta.env.VITE_SERVER_URL}</h1>

      <h1>overall todos: {todosCount}</h1>
      <section>
        {todos.map((todo: any) => (
          <div>
            <p>ID : {todo.ID}</p>
            <p>Title : {todo.Title}</p>
            <p>Description : {todo.Description}</p>
            <p>DueDate : {todo.DueDate}</p>
            <p>UpdatedDate : {todo.UpdatedDate}</p>
            <p>Priority : {todo.Priority}</p>
            <p>Status : {todo.Status}</p>
            <button onClick={() => handleDelete(todo.ID)}>delete</button>
            <button onClick={() => handleUpdate(todo.ID)}>update</button>
          </div>
        ))}
      </section> */}
    </main>
  );
}

export default App;
