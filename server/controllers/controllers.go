package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"

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
