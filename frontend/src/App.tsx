import { useEffect } from "react";

function App() {
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch("http://localhost:3333/")
      .then((res) => res.json())
      .then((data) => console.log("data: ", data))
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <section>heelo wold</section>
    </main>
  );
}

export default App;
