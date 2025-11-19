/**
 * Additional vulnerable C++ code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

#include <iostream>
#include <fstream>
#include <cstring>
#include <cstdlib>

// SQL Injection (if using string concatenation)
std::string buildSearchQuery(std::string searchTerm) {
    return "SELECT * FROM users WHERE name LIKE '%" + searchTerm + "%'";
}

// Hardcoded secrets
const char* DB_PASSWORD = "admin123";
const char* API_KEY = "sk_live_51H3ll0W0rld123456789";

// Command Injection
void runSystemCommand(const char* command) {
    system(command);
}

// Path Traversal
std::string readConfigFile(const std::string& filename) {
    std::ifstream file("/etc/config/" + filename);
    std::string content((std::istreambuf_iterator<char>(file)),
                        std::istreambuf_iterator<char>());
    return content;
}

