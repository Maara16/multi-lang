/**
 * Vulnerable C++ code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <cstring>
#include <openssl/md5.h>

// SQL Injection vulnerability (if using string concatenation)
std::string buildQuery(std::string userId) {
    return "SELECT * FROM users WHERE id = " + userId;
}

// Command Injection
void executeCommand(const char* command) {
    system(command);
}

// Hardcoded secrets
const char* API_KEY = "sk_live_51H3ll0W0rld123456789";
const char* PASSWORD = "admin123";
const char* SECRET = "mySecretKey123";

// Path Traversal
std::string readFile(const std::string& filename) {
    std::ifstream file("/var/www/data/" + filename);
    std::string content((std::istreambuf_iterator<char>(file)),
                        std::istreambuf_iterator<char>());
    return content;
}

// Buffer overflow vulnerability
void copyString(char* dest, const char* src) {
    strcpy(dest, src);  // Unsafe - no bounds checking
}

// Weak crypto - MD5
std::string hashPassword(const std::string& password) {
    unsigned char digest[MD5_DIGEST_LENGTH];
    MD5((unsigned char*)password.c_str(), password.length(), digest);
    
    char mdString[33];
    for (int i = 0; i < 16; i++)
        sprintf(&mdString[i*2], "%02x", (unsigned int)digest[i]);
    
    return std::string(mdString);
}

// Use of unsafe functions
void processInput(char* input) {
    char buffer[100];
    sprintf(buffer, input);  // Format string vulnerability
}

