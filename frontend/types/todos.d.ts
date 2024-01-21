export interface TodosType {
  ID: string;
  Title: string;
  Description: string;
  DueDate: Date;
  UpdatedDate: Date;
  Priority: PriorityType;
  Status: StatusType;
}

export type PriorityType = 1 | 2 | 3;
// const (
// 	High   Priority = 3
// 	Medium Priority = 2
// 	Low    Priority = 1
// )

export type StatusType = 1 | 2 | 3 | 4;
// const (
// 	Cancelled  Status = 4
// 	Completed  Status = 3
// 	InProgress Status = 2
// 	Pending    Status = 1
// )
