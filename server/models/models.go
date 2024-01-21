package models

import "time"

type Priority uint8
type Status uint8

const (
	High   Priority = 3
	Medium Priority = 2
	Low    Priority = 1
)

const (
	Cancelled  Status = 4
	Completed  Status = 3
	InProgress Status = 2
	Pending    Status = 1
)

type Task struct {
	ID          int64
	Title       string
	Description string
	DueDate     time.Time
	Priority    Priority
	Status      Status
}
