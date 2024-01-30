import {
  UtilsPriorityDisplay,
  UtilsStatusDisplay,
} from "@/utils/Utils.DisplayStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import dayjs from "dayjs";
import { TodosType } from "types/todos";

function CompCard({ todo }: { todo: TodosType }) {
  return (
    <Card key={todo.ID} className="m-auto max-w-[500px]">
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
    </Card>
  );
}

export default CompCard;
