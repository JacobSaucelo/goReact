import { DataTable } from "@/tableData/data-table";
import { TodosType } from "../../types/todos";

import { columns } from "@/tableData/columns";

export default function CompDisplayTodos({ todos }: { todos: TodosType[] }) {
  return (
    <article className="rounded-md border">
      <DataTable columns={columns} data={todos} />
    </article>
  );
}
