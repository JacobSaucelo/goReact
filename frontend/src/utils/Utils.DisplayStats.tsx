export function PriorityDisplay(priority: number) {
  switch (priority) {
    case 1:
      return (
        <div>
          Low{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-yellow-500" />
        </div>
      );
    case 2:
      return (
        <div>
          Medium{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-green-500" />
        </div>
      );
    case 3:
      return (
        <div>
          High{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-red-500" />
        </div>
      );

    default:
      return (
        <div>
          Undeclared/Undecided{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-500" />
        </div>
      );
  }
}
// export type PriorityType = 1 | 2 | 3;
// const (
// 	High   Priority = 3
// 	Medium Priority = 2
// 	Low    Priority = 1
// )

export function StatusDisplay(status: number) {
  switch (status) {
    case 1:
      return (
        <div>
          Pending{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-yellow-500" />
        </div>
      );
    case 2:
      return (
        <div>
          InProgress{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-green-500" />
        </div>
      );
    case 3:
      return (
        <div>
          Completed{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-red-500" />
        </div>
      );
    case 3:
      return (
        <div>
          Cancelled{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-white" />
        </div>
      );

    default:
      return (
        <div>
          Undeclared/Undecided{" "}
          <span className="flex h-3 w-3 translate-y-1 rounded-sm bg-gray-500" />
        </div>
      );
  }
}
// export type StatusType = 1 | 2 | 3 | 4;
// const (
// 	Cancelled  Status = 4
// 	Completed  Status = 3
// 	InProgress Status = 2
// 	Pending    Status = 1
// )
