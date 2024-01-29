import CompTodosContainer from "./components/Comp.TodosContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesUpdatePage from "./pages/Pages.UpdatePage";
import PagesAddPage from "./pages/Pages.AddPage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <section className="max-w-3xl m-auto">
          <div className="p-5">
            <Routes>
              <Route path="/" element={<CompTodosContainer />} />
              <Route path="/add-todo" element={<PagesAddPage />} />
              <Route path="/update/:id" element={<PagesUpdatePage />} />
            </Routes>
          </div>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
