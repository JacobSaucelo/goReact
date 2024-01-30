import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { TodosType } from "types/todos";
import {
  ChevronsUpDown,
  MoreHorizontal,
  MoveUp,
  MoveDown,
  CalendarMinus,
  CalendarPlus,
  Calendar,
  CheckCircle,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UtilsPriorityDisplay,
  UtilsStatusDisplay,
} from "@/utils/Utils.DisplayStats";
import { Link } from "react-router-dom";

export const columns: ColumnDef<TodosType>[] = [
  //   {
  //     accessorKey: "ID",
  //     header: "ID",
  //   },
  {
    accessorKey: "Title",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2">
              {/* <span className="sr-only"></span> */}
              Title
              {column.getIsSorted() === "asc" && (
                <MoveUp className="ms-2 h-3 w-3" />
              )}
              {column.getIsSorted() === "desc" && (
                <MoveDown className="ms-2 h-3 w-3" />
              )}
              {column.getIsSorted() !== "asc" &&
                column.getIsSorted() !== "desc" && (
                  <ChevronsUpDown className="ms-2 h-4 w-4" />
                )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort Title</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <MoveUp className="me-2 h-3 w-3" /> Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <MoveDown className="me-2 h-3 w-3" /> Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 px-2 flex items-center justify-center gap-2"
            >
              <div>Status</div>
              {column.getIsSorted() === "asc" && (
                <span className="flex h-3 w-3 rounded-full bg-yellow-500" />
              )}
              {column.getIsSorted() === "desc" && (
                <span className="flex h-3 w-3 rounded-full bg-red-500" />
              )}
              {column.getIsSorted() !== "asc" &&
                column.getIsSorted() !== "desc" && (
                  <span className="flex h-3 w-3 rounded-full bg-gray-500" />
                )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort Title</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span className="flex h-3 w-3 rounded-full bg-yellow-500 me-2" />{" "}
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span className="flex h-3 w-3 rounded-full bg-red-500 me-2" />{" "}
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      return <div>{UtilsStatusDisplay(row.renderValue("Status"), true)}</div>;
    },
  },
  {
    accessorKey: "Priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          {column.getIsSorted() === "asc" && (
            <MoveDown className="ms-2 h-3 w-3" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveUp className="ms-2 h-3 w-3" />
          )}
          {column.getIsSorted() !== "asc" &&
            column.getIsSorted() !== "desc" && (
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{UtilsPriorityDisplay(row.renderValue("Priority"))}</div>;
    },
  },
  {
    accessorKey: "DueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DueDate
          {column.getIsSorted() === "asc" && (
            <CalendarPlus className="ms-2 h-3 w-3" />
          )}
          {column.getIsSorted() === "desc" && (
            <CalendarMinus className="ms-2 h-3 w-3" />
          )}
          {column.getIsSorted() !== "asc" &&
            column.getIsSorted() !== "desc" && (
              <Calendar className="ms-2 h-3 w-3" />
            )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-blue-400">
          {dayjs(row.renderValue("DueDate")).format("ddd, MMM D, YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Task Id</DropdownMenuLabel>
            <DropdownMenuItem className="text-xs text-muted-foreground">
              {task.ID}
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <Link to={"/done/" + task.ID}>
              <DropdownMenuItem>
                <CheckCircle className="h-4 w-4 me-2" /> Finish Task
              </DropdownMenuItem>
            </Link>
            <Link to={"/update/" + task.ID}>
              <DropdownMenuItem>
                <SquarePen className="h-4 w-4 me-2" />
                Update Task
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
