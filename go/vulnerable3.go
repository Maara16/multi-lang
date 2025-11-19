/**
 * Additional vulnerable Go code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

package main

import (
	"crypto/md5"
	"fmt"
	"io/ioutil"
	"path/filepath"
)

// Hardcoded API keys
const (
	StripeKey = "sk_live_51H3ll0W0rld123456789"
	AWSKey    = "AKIAIOSFODNN7EXAMPLE"
)

// Weak crypto - MD5
func hashData(data string) string {
	hash := md5.Sum([]byte(data))
	return fmt.Sprintf("%x", hash)
}

// Path Traversal
func readConfigFile(filename string) ([]byte, error) {
	path := filepath.Join("/etc/config", filename)
	return ioutil.ReadFile(path)
}

