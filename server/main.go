package main

import (
	"encoding/json"
	"net/http"
)

type items struct {
	Name  string `json:name`
	Price uint8  `json:price`
}

func main() {

	mux := http.NewServeMux()

	mux.HandleFunc("/", handleReturnItems)

	http.ListenAndServe(":3333", mux)
}

func handleReturnItems(w http.ResponseWriter, r *http.Request) {

	var backpack = []items{
		{
			Name:  "book",
			Price: 10,
		},
		{
			Name:  "sword",
			Price: 8,
		},
		{
			Name:  "bow",
			Price: 12,
		},
	}
	response, err := json.Marshal(backpack)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Write(response)

}
