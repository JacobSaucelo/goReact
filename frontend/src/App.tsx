import { useEffect, useState } from "react";

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => res.json())
      .then((data) => console.log("data: ", data))
      .catch((err) => console.log(err));
  };

  const handlePost = async () => {
    await fetch(import.meta.env.VITE_SERVER_URL + "add-todo", {
      method: "POST",
      body: JSON.stringify({
        ID: 2,
        Title: "jacob",
        Description: "description",
        DueDate: dateTime.toISOString(),
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
    </main>
  );
}

export default App;
