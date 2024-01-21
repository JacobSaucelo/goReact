package models

import "time"

type Priority uint8
type Status uint8

// const (
// 	High   Priority = 3
// 	Medium Priority = 2
// 	Low    Priority = 1
// )

// const (
// 	Cancelled  Status = 4
// 	Completed  Status = 3
// 	InProgress Status = 2
// 	Pending    Status = 1
// )

type Task struct {
	ID          int64     `json:id`
	Title       string    `json:title`
	Description string    `json:description`
	DueDate     time.Time `json:dueDate`
	Priority    uint8     `json:priority`
	Status      uint8     `json:status`
}

type TasksCollection struct {
	Count uint32 `json:count`
	Data  []Task `json:data`
}

type ControllerResponse struct {
	Message string `json:message`
	Data    any    `json:data`
}
