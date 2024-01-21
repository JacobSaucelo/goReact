package controllers

import (
	"os"
	"path/filepath"

	"com.jacobsaucelo.go-react/models"
)

func GetTodoList() models.TasksCollection {
	fPath := filepath.Join("/data/", "data.json")

	saveFile, err := os.Open()
}

func NewTodoList() *models.TasksCollection {
	return &models.TasksCollection{
		Count: 0,
		Data:  []models.Task{},
	}
}
