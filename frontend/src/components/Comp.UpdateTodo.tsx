import { ClipboardList, SquarePen } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompCalendar } from "./Comp.Calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { TodosType } from "types/todos";
import dayjs from "dayjs";
import {
  UtilsPriorityDisplay,
  UtilsStatusDisplay,
} from "@/utils/Utils.DisplayStats";

type OnChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function CompUpdateTodo({ todo }: { todo: TodosType }) {
  const [date, setDate] = useState<Date>();
  const [formTodo, setFormTodo] = useState<TodosType>({
    ID: "",
    Title: "",
    Description: "",
    DueDate: new Date(),
    UpdatedDate: undefined,
    Priority: 1,
    Status: 1,
  });

  useEffect(() => {
    setFormTodo(todo);
  }, []);

  const handleInputChange = (e: OnChangeType) => {
    const { name, value } = e.target;
    console.log("UPDATE Input: ", name, ":", value);
    setFormTodo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    console.log("UPDATE Select: ", name, ":", value);
    setFormTodo((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full" size="sm" variant="outline">
          <SquarePen className="mr-2 h-4 w-4" /> Update task
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ClipboardList className="mr-2 h-6 w-6" />
            Update New Task
          </SheetTitle>
          <SheetDescription>
            Fill up the necessary label to add a task
          </SheetDescription>
        </SheetHeader>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <header className="capitalize">{formTodo.Title}</header>
              <span className="flex h-3 w-3 translate-y-1 rounded-full bg-sky-500" />
            </CardTitle>
            <CardDescription>
              Due at {dayjs(formTodo.DueDate).format("ddd, MMM D, YYYY h:mm A")}
            </CardDescription>
            <p className="text-secondary text-xs">Ref ID: {formTodo.ID}</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xs text-muted-foreground">
              <p className="flex gap-1">
                <span className="text-white">Priority:</span>
                {UtilsPriorityDisplay(formTodo.Priority)}
              </p>
              <p className="flex gap-1">
                <span className="text-white">Status:</span>
                {UtilsStatusDisplay(formTodo.Status)}
              </p>
            </div>
            <p className="text-muted-foreground my-2">{formTodo.Description}</p>
            {formTodo.UpdatedDate && (
              <p className="text-xs text-muted-foreground">
                Task updated at{" "}
                <span className="text-blue-400">
                  {dayjs(formTodo.UpdatedDate).format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </span>
              </p>
            )}
          </CardContent>
        </Card>

        <hr className="mt-2" />

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              name="Title"
              placeholder="Buy milk"
              className="col-span-3"
              value={formTodo.Title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              name="Description"
              className="col-span-3"
              value={formTodo.Description}
              placeholder="Go to the nearest store and buy milk."
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Due Date
            </Label>
            <CompCalendar date={date} setDate={setDate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Priority
            </Label>

            <Select
              name="Priority"
              onValueChange={(value) => handleSelectChange(value, "Priority")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Low (Default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">
                  <div className="flex gap-1">
                    High
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-red-500" />
                  </div>
                </SelectItem>
                <SelectItem value="2">
                  <div className="flex gap-1">
                    Medium
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-green-500" />
                  </div>
                </SelectItem>
                <SelectItem value="1">
                  <div className="flex gap-1">
                    Low
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-yellow-500" />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Status
            </Label>
            <Select
              name="Status"
              onValueChange={(value) => handleSelectChange(value, "Status")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pending (Default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">
                  <div className="flex gap-1">
                    Cancelled
                    <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-red-500" />
                  </div>
                </SelectItem>
                <SelectItem value="3">
                  <div className="flex gap-1">
                    Completed
                    <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-green-500" />
                  </div>
                </SelectItem>
                <SelectItem value="2">
                  <div className="flex gap-1">
                    InProgress
                    <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-blue-500" />
                  </div>
                </SelectItem>
                <SelectItem value="1">
                  <div className="flex gap-1">
                    Pending
                    <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-yellow-500" />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                console.log("formTodo: ", formTodo);

                //   handleUpdate(formTodo);
                //   setFormTodo({
                //     ID: "",
                //     Title: "",
                //     Description: "",
                //     DueDate: new Date(),
                //     UpdatedDate: undefined,
                //     Priority: 1,
                //     Status: 1,
                //   });
                //   setDate(undefined);
                //
              }}
            >
              Update Task
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
