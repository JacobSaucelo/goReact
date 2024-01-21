package controllers

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"com.jacobsaucelo.go-react/models"
)

var folderName = "/data/"
var saveFileName = "data.json"

func GetTodoList() models.TasksCollection {
	fPath := filepath.Join(folderName, saveFileName)

	saveFile, err := os.Open(fPath)
	if err != nil {
		fmt.Println("SERVER: Error opening file, ", err)
		return models.TasksCollection{}
	}
	defer saveFile.Close()

	var appTodoList models.TasksCollection

	err = json.NewDecoder(saveFile).Decode(&appTodoList)
	if err != nil {
		fmt.Println("SERVER: Error decoding savefile, ", err)
		return models.TasksCollection{}
	}

	return appTodoList
}

func NewTodoList() *models.TasksCollection {
	return &models.TasksCollection{
		Count: 0,
		Data:  []models.Task{},
	}
}
