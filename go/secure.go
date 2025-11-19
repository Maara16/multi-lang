/**
 * Secure Go code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

package main

import (
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// ✅ SAFE: Parameterized SQL query (should NOT be flagged)
func getUserData(userID string) (*sql.Rows, error) {
	query := "SELECT * FROM users WHERE id = $1"
	return db.Query(query, userID) // Parameterized query
}

// ✅ SAFE: Parameterized SQL with LIKE (should NOT be flagged)
func searchUsers(searchTerm string) (*sql.Rows, error) {
	query := "SELECT * FROM users WHERE name LIKE $1"
	searchPattern := "%" + searchTerm + "%"
	return db.Query(query, searchPattern) // Parameterized
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
func executeCommand(command string) error {
	allowedCommands := []string{"ls", "pwd", "date"}
	for _, allowed := range allowedCommands {
		if command == allowed {
			cmd := exec.Command(command)
			return cmd.Run()
		}
	}
	return fmt.Errorf("command not allowed")
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
var (
	apiKey    = os.Getenv("API_KEY")
	password  = os.Getenv("DB_PASSWORD")
	secretKey = os.Getenv("SECRET_KEY")
)

// ✅ SAFE: Path validation before file access (should NOT be flagged)
func readFile(filename string) ([]byte, error) {
	basePath := "/var/www/data"
	safePath := filepath.Join(basePath, filepath.Base(filename))
	
	// Validate path
	absPath, err := filepath.Abs(safePath)
	if err != nil {
		return nil, err
	}
	absBase, _ := filepath.Abs(basePath)
	if !filepath.HasPrefix(absPath, absBase) {
		return nil, fmt.Errorf("invalid path")
	}
	
	return os.ReadFile(safePath)
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return fmt.Sprintf("%x", hash)
}

// ✅ SAFE: Secure random (should NOT be flagged)
func generateToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", b), nil
}

