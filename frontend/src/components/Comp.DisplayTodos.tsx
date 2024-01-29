import { Check, SquarePen } from "lucide-react";
import { TodosType } from "../../types/todos";
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
import {
  UtilsPriorityDisplay,
  UtilsStatusDisplay,
} from "@/utils/Utils.DisplayStats";
import { Link } from "react-router-dom";

export default function CompDisplayTodos({ todos }: { todos: TodosType[] }) {
  return (
    <article className="flex flex-col gap-2 my-4">
      {todos.map((todo) => (
        <Card key={todo.ID}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <header className="capitalize">{todo.Title}</header>
              {UtilsStatusDisplay(todo.Status, false)}

              {/* <span className="flex h-3 w-3 translate-y-1 rounded-full bg-sky-500" /> */}
            </CardTitle>
            <CardDescription>
              Due at{" "}
              <span className="text-blue-400">
                {dayjs(todo.DueDate).format("ddd, MMM D, YYYY h:mm A")}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 justify-between text-xs text-muted-foreground sm:flex-row">
              <aside className="flex gap-2 flex-wrap">
                <p className="flex items-center gap-1">
                  <span className="text-muted-foreground">Priority:</span>
                  {UtilsPriorityDisplay(todo.Priority)}
                </p>
                <p className="flex items-center gap-1">
                  <span className="text-muted-foreground">Status:</span>
                  {UtilsStatusDisplay(todo.Status, true)}
                </p>
              </aside>
              <p className="text-secondary">Ref ID: {todo.ID}</p>
            </div>
            <p className="my-2 py-3">{todo.Description}</p>
            {todo.UpdatedDate && (
              <p className="text-xs text-muted-foreground">
                Task updated at{" "}
                <span className="text-blue-400">
                  {dayjs(todo.UpdatedDate).format("ddd, MMM D, YYYY h:mm A")}
                </span>
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full" size="sm" variant="default">
              <Link to={"delete/" + todo.ID}>
                <p className="flex items-center">
                  <Check className="mr-2 h-4 w-4" /> Mark as done
                </p>
              </Link>
            </Button>

            <Button className="w-full" size="sm" variant="outline" asChild>
              <Link to={"update/" + todo.ID}>
                <p className="flex items-center">
                  <SquarePen className="mr-2 h-4 w-4" /> Update task
                </p>
              </Link>
            </Button>
            {/* <CompUpdateTodo handleUpdate={handleUpdate} todoID={todo.ID} /> */}
          </CardFooter>
        </Card>
      ))}
    </article>
  );
}
