import { TodosType } from "../../types/todos";

export default function CompDisplayTodos({ todos }: { todos: TodosType[] }) {
  return (
    <article>
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
