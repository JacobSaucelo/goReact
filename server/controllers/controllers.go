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
		UpdatedDate: resBody.UpdatedDate,
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
		fmt.Println("SERVER: Error marshalling response, ", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	w.Write(response)
}

func RemoveTodoDelete(w http.ResponseWriter, r *http.Request) {
	var resBody models.DeleteTask
	err := json.NewDecoder(r.Body).Decode(&resBody)
	if err != nil {
		fmt.Println("SERVER[AddTodoPost]: Error decoding resBody, ", err)
	}

	fPath := filepath.Join(folderName, saveFileName)
	saveData, err := utils.ReadSaveFile(fPath)
	if err != nil {
		fmt.Println("SERVER[RemoveTodoDelete]: No file found, creating a new one")
		utils.GenerateSaveFile()
	}

	var foundIndex int = -1
	for index, todo := range saveData.Data {
		if todo.ID == resBody.ID {
			foundIndex = index
			break
		}
	}

	var responseData = models.ControllerResponse{}

	if foundIndex == -1 {
		fmt.Println("SERVER[RemoveTodoDelete]: Todo doesnt exists")
		responseData = models.ControllerResponse{
			Message: "Error, this todo doesnt exists.",
			Data:    resBody,
		}

		response, err := json.Marshal(responseData)
		if err != nil {
			fmt.Println("SERVER: Error marshalling response, ", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}

		w.Write(response)
	} else {
		saveData.Data[foundIndex] = saveData.Data[len(saveData.Data)-1]
		saveData.Data = saveData.Data[:len(saveData.Data)-1]
		saveData.Count = saveData.Count - 1

		err = utils.SaveFile(fPath, saveData)
		if err != nil {
			fmt.Println("SERVER[RemoveTodoDelete]: Error saving json file on Remove todo", err)
		}

		responseData = models.ControllerResponse{
			Message: "Successfully deleted " + resBody.ID,
			Data:    saveData,
		}

		response, err := json.Marshal(responseData)
		if err != nil {
			fmt.Println("SERVER: Error marshalling response, ", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}

		w.Write(response)
	}
}

func UpdateTodoPatch(w http.ResponseWriter, r *http.Request) {
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

	var foundIndex int = -1
	for index, todo := range saveData.Data {
		if todo.ID == resBody.ID {
			foundIndex = index
			break
		}
	}

	var responseData = models.ControllerResponse{}

	fmt.Println("resBody: ", resBody)

	if foundIndex == -1 {
		fmt.Println("SERVER[RemoveTodoDelete]: Todo doesnt exists")
		responseData = models.ControllerResponse{
			Message: "Error, this todo doesnt exists.",
			Data:    resBody,
		}

		response, err := json.Marshal(responseData)
		if err != nil {
			fmt.Println("SERVER: Error marshalling response, ", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}

		w.Write(response)
	} else {
		saveData.Data[foundIndex].Title = resBody.Title
		saveData.Data[foundIndex].Description = resBody.Description
		saveData.Data[foundIndex].DueDate = resBody.DueDate
		saveData.Data[foundIndex].UpdatedDate = resBody.UpdatedDate
		saveData.Data[foundIndex].Priority = resBody.Priority
		saveData.Data[foundIndex].Status = resBody.Status

		err = utils.SaveFile(fPath, saveData)
		if err != nil {
			fmt.Println("SERVER[RemoveTodoDelete]: Error saving json file on Remove todo", err)
		}

		responseData = models.ControllerResponse{
			Message: "Successfully updated " + resBody.ID,
			Data:    saveData.Data[foundIndex],
		}

		response, err := json.Marshal(responseData)
		if err != nil {
			fmt.Println("SERVER: Error marshalling response, ", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}

		w.Write(response)
	}
}
