import { Badge } from "@/components/ui/badge";

export function UtilsPriorityDisplay(priority: number) {
  switch (priority) {
    case 1:
      return (
        <Badge
          variant="default"
          className="flex items-center justify-center bg-yellow-500 font-bold "
        >
          Low
        </Badge>
      );
    case 2:
      return (
        <Badge
          variant="default"
          className="flex items-center justify-center bg-green-500 font-bold"
        >
          Medium
        </Badge>
      );
    case 3:
      return (
        <Badge
          variant="default"
          className="flex items-center justify-center bg-red-500 font-bold"
        >
          High
        </Badge>
      );

    default:
      return (
        <Badge
          variant="default"
          className="flex items-center bg-gray-500 font-bold"
        >
          Undecided
        </Badge>
      );
  }
}
// export type PriorityType = 1 | 2 | 3;
// const (
// 	High   Priority = 3
// 	Medium Priority = 2
// 	Low    Priority = 1
// )

// export type StatusType = 1 | 2 | 3 | 4;
// const (
// 	Cancelled  Status = 4
// 	Completed  Status = 3
// 	InProgress Status = 2
// 	Pending    Status = 1
// )

export function UtilsStatusDisplay(status: number, displayName: boolean) {
  switch (status) {
    case 1:
      return (
        <div className="flex gap-1">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-yellow-500" />
          {displayName && "Pending"}
        </div>
      );
    case 2:
      return (
        <div className="flex gap-1">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-blue-500" />
          {displayName && "InProgress"}
        </div>
      );
    case 3:
      return (
        <div className="flex gap-1">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-green-500" />
          {displayName && "Completed"}
        </div>
      );
    case 4:
      return (
        <div className="flex gap-1">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-red-500" />
          {displayName && "Cancelled"}
        </div>
      );

    default:
      return (
        <div className="flex gap-1">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-500" />
          Undecided
        </div>
      );
  }
}
