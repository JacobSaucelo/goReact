import { TodosType } from "../../types/todos";
import { ModeToggle } from "./mode-toggle";

export default function CompDisplayTodos({ todos }: { todos: TodosType[] }) {
  return (
    <article>
      <ModeToggle />

      <h1 className="text-muted-foreground">hwllo</h1>
      {todos.map((todo) => (
        <aside key={todo.ID}>
          <p>{todo.ID}</p>
          <p>{todo.Title}</p>
          <p>{todo.Description}</p>
        </aside>
      ))}
    </article>
  );
}
