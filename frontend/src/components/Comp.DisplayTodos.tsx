import { Check, Trash2 } from "lucide-react";
import { TodosType } from "../../types/todos";
import { ModeToggle } from "./mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function CompDisplayTodos({ todos }: { todos: TodosType[] }) {
  return (
    <article>
      <ModeToggle />

      <h1 className="text-muted-foreground">hwllo</h1>
      {todos.map((todo) => (
        <Card key={todo.ID}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <header className="capitalize">{todo.Title}</header>
              <span className="flex h-3 w-3 translate-y-1 rounded-full bg-sky-500" />
            </CardTitle>
            <CardDescription>
              Due at{" "}
              <span className="text-blue-400">
                {dayjs(todo.DueDate).format("ddd, MMM D, YYYY h:mm A")}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xs text-muted-foreground">
              <aside className="flex gap-2 text-sm">
                <p>Priority {todo.Priority}</p>
                <p>Status {todo.Status}</p>
              </aside>
              <p className="text-secondary">Ref ID: {todo.ID}</p>
            </div>
            <p className="text-muted-foreground my-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
              officiis beatae quis optio vero totam expedita voluptatum, ipsam
              quaerat delectus!
              {/* {todo.Description} */}
            </p>
            {todo.UpdatedDate && (
              <p className="text-xs text-muted-foreground">
                Task updated at{" "}
                <span className="text-blue-400">
                  {dayjs(todo.UpdatedDate).format("ddd, MMM D, YYYY h:mm A")}
                </span>
              </p>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="w-full" size="sm" variant="default">
              <Check className="mr-2 h-4 w-4" /> Mark as done
            </Button>
            <Button className="w-full" size="sm" variant="outline">
              <Trash2 className="mr-2 h-4 w-4" /> Update task
            </Button>
          </CardFooter>
        </Card>

        // <aside >
        //   <p>{todo.ID}</p>
        //   <p>{todo.Title}</p>
        //   <p>{todo.Description}</p>
        // </aside>
      ))}
    </article>
  );
}
