package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"

	"com.jacobsaucelo.go-react/models"
	"com.jacobsaucelo.go-react/utils"
)

var folderName = "data/"
var saveFileName = "data.json"

func DisplayTodosGet(w http.ResponseWriter, r *http.Request) {
	fPath := filepath.Join(folderName, saveFileName)

	saveData, err := utils.ReadSaveFile(fPath)
	if err != nil {
		fmt.Println("SERVER[DisplayTodosGet]: No file found, creating a new one")
		utils.GenerateSaveFile()
	}

	response, err := json.Marshal(saveData)
	if err != nil {
		fmt.Println("SERVER: Error marshalling save file, ", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	w.Write(response)
}

func AddTodoPost(w http.ResponseWriter, r *http.Request) {
	var resBody models.Task
	err := json.NewDecoder(r.Body).Decode(&resBody)
	if err != nil {
		fmt.Println("SERVER[AddTodoPost]: Error decoding resBody, ", err)
	}

	fPath := filepath.Join(folderName, saveFileName)
	saveData, err := utils.ReadSaveFile(fPath)
	if err != nil {
		fmt.Println("SERVER[DisplayTodosGet]: No file found, creating a new one")
		utils.GenerateSaveFile()
	}

	addTodo := models.Task{
		ID:          utils.GenerateTimeBasedId(),
		Title:       resBody.Title,
		Description: resBody.Description,
		DueDate:     resBody.DueDate,
		Priority:    resBody.Priority,
		Status:      resBody.Status,
	}

	saveData.Data = append(saveData.Data, addTodo)
	saveData.Count = uint32(len(saveData.Data))

	err = utils.SaveFile(fPath, saveData)
	if err != nil {
		fmt.Println("SERVER[AddTodoPost]: Error saving json file on add todo", err)
	}

	var responseData = models.ControllerResponse{
		Message: "Success",
		Data:    addTodo,
	}

	response, err := json.Marshal(responseData)
	if err != nil {
		fmt.Println("SERVER: Error marshalling save file, ", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	w.Write(response)
}
