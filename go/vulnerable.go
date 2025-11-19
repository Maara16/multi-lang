/**
 * Vulnerable Go code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

package main

import (
	"crypto/md5"
	"database/sql"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

// SQL Injection vulnerability
func getUserData(userID string) (*sql.Rows, error) {
	query := fmt.Sprintf("SELECT * FROM users WHERE id = %s", userID)
	return db.Query(query)
}

// Command Injection
func executeCommand(command string) error {
	cmd := exec.Command("sh", "-c", command)
	return cmd.Run()
}

// Hardcoded secrets
const (
	apiKey    = "sk_live_51H3ll0W0rld123456789"
	password  = "admin123"
	secretKey = "mySecretKey123"
)

// Path Traversal
func readFile(filename string) ([]byte, error) {
	path := filepath.Join("/var/www/data", filename)
	return ioutil.ReadFile(path)
}

// Weak crypto - MD5
func hashPassword(password string) string {
	hash := md5.Sum([]byte(password))
	return fmt.Sprintf("%x", hash)
}

// Insecure random
func generateToken() string {
	return fmt.Sprintf("%d", os.Getpid())
}

// Command Injection with exec.Command
func runCommand(cmd string) error {
	return exec.Command("bash", "-c", cmd).Run()
}

