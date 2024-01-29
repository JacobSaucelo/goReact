import { useState } from "react";
import { PriorityType, StatusType, TodosType } from "types/todos";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CompCalendar } from "./Comp.Calendar";

type OnChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function CompForm({ formData, setFormData, date, setDate }) {
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

  return (
    <section>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Title
        </Label>
        <Input
          name="Title"
          placeholder="Buy milk"
          className="col-span-3"
          onChange={handleInputChange}
        />

        <Label htmlFor="name" className="text-right">
          Description
        </Label>
        <Textarea
          name="Description"
          className="col-span-3"
          placeholder="Go to the nearest store and buy milk."
          onChange={handleInputChange}
        />

        <Label htmlFor="name" className="text-right">
          due date
        </Label>
        <CompCalendar date={date} setDate={setDate} />

        <Label htmlFor="name" className="text-right">
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

        <Label htmlFor="name" className="text-right">
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
    </section>
  );
}
// Title: formData.Title
// Description: formData.Description
// DueDate: date,
// UpdatedDate: null,
// Priority: formData.Priority
// Status: formData.Status
