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
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, Underline } from "lucide-react";
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
import { useState } from "react";
import { TodosType } from "types/todos";

export default function CompAddTodo({
  handlePost,
  date,
  setDate,
}: {
  handlePost: () => void;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [formTodo, setFormTodo] = useState<TodosType>({
    ID: "",
    Title: "",
    Description: "",
    DueDate: new Date(),
    UpdatedDate: undefined,
    Priority: 1,
    Status: 1,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ClipboardList className="mr-2 h-6 w-6" />
            Create New Task
          </SheetTitle>
          <SheetDescription>
            Fill up the necessary label to add a task
          </SheetDescription>
        </SheetHeader>

        <hr className="mt-2" />

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" placeholder="Buy milk" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              placeholder="Go to the nearest store and buy milk."
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
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pick your task's priority" />
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
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Choose what status is it" />
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
            <Button size="sm" variant="secondary" onClick={handlePost}>
              Add Task
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
