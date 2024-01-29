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
import CompUpdateTodo from "./Comp.UpdateTodo";
import { Link } from "react-router-dom";

export default function CompDisplayTodos({
  todos,
  handleDelete,
  handleUpdate,
}: {
  todos: TodosType[];
  handleDelete: (id: string) => void;
  handleUpdate: (formData: TodosType, newdate: Date) => void;
}) {
  return (
    <article className="flex flex-col gap-2">
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
                <p className="flex gap-1">
                  <span className="text-white">Priority:</span>
                  {UtilsPriorityDisplay(todo.Priority)}
                </p>
                <p className="flex gap-1">
                  <span className="text-white">Status:</span>
                  {UtilsStatusDisplay(todo.Status)}
                </p>
              </aside>
              <p className="text-secondary">Ref ID: {todo.ID}</p>
            </div>
            <p className="text-muted-foreground my-2">{todo.Description}</p>
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
            <Button
              className="w-full"
              size="sm"
              variant="default"
              onClick={() => handleDelete(todo.ID)}
            >
              <Check className="mr-2 h-4 w-4" /> Mark as done
            </Button>

            <Button className="w-full" size="sm" variant="outline" asChild>
              <Link to={"update/" + todo.ID}>
                <SquarePen className="mr-2 h-4 w-4" /> Update task
              </Link>
            </Button>
            {/* <CompUpdateTodo handleUpdate={handleUpdate} todoID={todo.ID} /> */}
          </CardFooter>
        </Card>
      ))}
    </article>
  );
}
