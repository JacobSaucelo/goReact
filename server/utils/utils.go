package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"com.jacobsaucelo.go-react/models"
)

func GenerateTimeBasedId() int64 {
	uid := time.Now().UnixNano()
	return uid
}

func ReadSaveFile(fpath string) (models.TasksCollection, error) {
	saveFile, err := os.Open(fpath)
	if err != nil {
		fmt.Println("SERVER[ReadSaveFile]: Error opening file, ", err)
		return models.TasksCollection{}, err
	}
	defer saveFile.Close()

	var save models.TasksCollection

	err = json.NewDecoder(saveFile).Decode(&save)
	if err != nil {
		fmt.Println("SERVER[ReadSaveFile]: Error decoding save file, ", err)
		return models.TasksCollection{}, err
	}

	return save, nil
}

func GenerateSaveFile() {
	generate := []byte(`{"count":0, data: []}`)
	err := os.WriteFile("/data/data.json", generate, 0644)
	if err != nil {
		fmt.Println("SERVER[GenerateSaveFile]: Error file not generating.")
	}

	fmt.Println("SERVER[GenerateSaveFile]: Successfully generated file.")
}
