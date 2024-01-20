package utils

import "time"

func GenerateTimeBasedId() int64 {
	uid := time.Now().UnixNano()
	return uid
}
