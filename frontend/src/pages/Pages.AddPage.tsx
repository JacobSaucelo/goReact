import { CompCalendar } from "@/components/Comp.Calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { OnChangeType, TodosType } from "types/todos";
import { useNavigate } from "react-router-dom";

export default function PagesAddPage() {
  const [formData, setFormData] = useState<TodosType>({
    ID: "",
    Title: "",
    Description: "",
    DueDate: new Date(),
    UpdatedDate: null,
    Priority: 1,
    Status: 1,
  });
  const [date, setDate] = useState<Date>();
  const [validation, setValidation] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (e: OnChangeType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Boolean(
      formData.Title &&
        formData.Description &&
        formData.DueDate &&
        formData.Priority &&
        formData.Status
    );

    if (isFormValid) {
      setValidation(false);
      await fetch(import.meta.env.VITE_SERVER_URL + "/add-todo", {
        method: "POST",
        body: JSON.stringify({ ...formData, DueDate: date }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("ADD DATA: ", data);
          navigate("/");
        })
        .catch((err) => console.log("error: ", err));
    } else {
      console.log("NOT-VALID formData: ", formData, "| dataData: ", date);
      setValidation(true);
    }
  };

  return (
    <section>
      <header className="bg-gradient-to-r from-blue-600 rounded-xl flex items-center justify-evenly p-2">
        <img src="/create.png" height="100" width="100" />
        <aside>
          <h1 className="text-3xl font-semibold">Plan Your Next Task</h1>
          <p>Fill in the form to create your task.</p>
        </aside>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Title
          </Label>
          <Input
            name="Title"
            placeholder="Buy milk"
            className="col-span-3"
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="name" className="text-right">
            Description
          </Label>
          <Textarea
            name="Description"
            className="col-span-3"
            placeholder="Go to the nearest store and buy milk."
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="name" className="text-right">
            Due Date
          </Label>
          <CompCalendar date={date} setDate={setDate} />

          <Label htmlFor="name" className="text-right">
            Priority
          </Label>
          <Select
            name="Priority"
            onValueChange={(value) => handleSelectChange(value, "Priority")}
            required
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

          <Label htmlFor="name" className="text-right">
            Status
          </Label>
          <Select
            name="Status"
            onValueChange={(value) => handleSelectChange(value, "Status")}
            required
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

          {validation && "Error validation "}

          <div className="col-span-4 flex gap-2 items-center justify-center">
            <Button className="min-w-[200px]">Add todo</Button>
            <Button className="min-w-[200px]" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
