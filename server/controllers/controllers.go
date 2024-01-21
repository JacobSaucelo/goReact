package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"time"

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

	response, err := json.Marshal(resBody)
	if err != nil {
		fmt.Println("SERVER: Error marshalling save file, ", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

	fmt.Println(time.Now())

	w.Write(response)
}
