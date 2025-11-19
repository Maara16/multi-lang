/**
 * Additional vulnerable Go code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

package main

import (
	"database/sql"
	"fmt"
	"os/exec"
)

// SQL Injection
func searchUsers(searchTerm string) (*sql.Rows, error) {
	query := fmt.Sprintf("SELECT * FROM users WHERE name LIKE '%%%s%%'", searchTerm)
	return db.Query(query)
}

// Hardcoded secrets
var dbConfig = map[string]string{
	"host":     "localhost",
	"user":     "admin",
	"password": "admin123",
	"database": "mydb",
}

// Command Injection
func runCommand(cmd string) error {
	return exec.Command("sh", "-c", cmd).Run()
}

