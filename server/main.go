package main

import (
	"net/http"

	"com.jacobsaucelo.go-react/controllers"
)

type items struct {
	Id    int64  `json:id`
	Name  string `json:name`
	Price uint8  `json:price`
}

func main() {

	mux := http.NewServeMux()

	// mux.HandleFunc("/", handleReturnItems).Methods("GET")
	mux.HandleFunc("/", controllers.DisplayTodosGet)
	mux.HandleFunc("/add-todo", controllers.AddTodoPost)
	middleware := CORSHandler(mux)
	http.ListenAndServe(":3333", middleware)
}

// func handleReturnItems(w http.ResponseWriter, r *http.Request) {
// 	var backpack = []items{
// 		{
// 			Id:    1,
// 			Name:  "book",
// 			Price: 10,
// 		},
// 		{
// 			Id:    2,
// 			Name:  "sword",
// 			Price: 8,
// 		},
// 		{
// 			Id:    3,
// 			Name:  "bow",
// 			Price: 12,
// 		},
// 	}
// 	response, err := json.Marshal(backpack)
// 	if err != nil {
// 		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Write(response)
// }

func CORSHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}
