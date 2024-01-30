import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { TodosType } from "types/todos";
import { ChevronsUpDown, MoreHorizontal, MoveUp, MoveDown } from "lucide-react";
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
    // header: "Status",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2">
              {/* <span className="sr-only"></span> */}
              Status
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
    cell: ({ row }) => {
      return <div>{UtilsStatusDisplay(row.renderValue("Status"), true)}</div>;
    },
  },
  {
    accessorKey: "Priority",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2">
              {/* <span className="sr-only"></span> */}
              Priority
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
    cell: ({ row }) => {
      return <div>{UtilsPriorityDisplay(row.renderValue("Priority"))}</div>;
    },
  },
  {
    accessorKey: "DueDate",
    header: "DueDate",
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.ID)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
