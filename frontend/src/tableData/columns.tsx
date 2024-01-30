import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { TodosType } from "types/todos";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Title
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
      );
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "Priority",
    header: "Priority",
  },
  {
    accessorKey: "DueDate",
    header: "DueDate",
    cell: ({ row }) => {
      const DueDate = parseFloat(row.getValue("DueDate"));

      return (
        <div className="text-blue-400">
          {dayjs(DueDate).format("ddd, MMM D, YYYY h:mm A")}
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
