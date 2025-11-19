/**
 * Secure C++ code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <openssl/sha.h>
#include <openssl/rand.h>
#include <sstream>
#include <iomanip>

// ✅ SAFE: Parameterized SQL query (using prepared statements - should NOT be flagged)
std::string buildQuery(std::string userId) {
    // In real code, this would use prepared statements
    // This is a placeholder showing the pattern
    return "SELECT * FROM users WHERE id = ?"; // Placeholder for prepared statement
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
void executeCommand(const char* command) {
    const char* allowedCommands[] = {"ls", "pwd", "date", nullptr};
    bool isAllowed = false;
    for (int i = 0; allowedCommands[i] != nullptr; i++) {
        if (strcmp(command, allowedCommands[i]) == 0) {
            isAllowed = true;
            break;
        }
    }
    if (isAllowed) {
        system(command);
    }
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
#include <cstdlib>
const char* getApiKey() {
    return std::getenv("API_KEY");
}

const char* getPassword() {
    return std::getenv("DB_PASSWORD");
}

// ✅ SAFE: Path validation before file access (should NOT be flagged)
#include <filesystem>
std::string readFile(const std::string& filename) {
    std::filesystem::path basePath("/var/www/data");
    std::filesystem::path filePath = basePath / std::filesystem::path(filename).filename();
    
    std::filesystem::path canonicalBase = std::filesystem::canonical(basePath);
    std::filesystem::path canonicalFile = std::filesystem::canonical(filePath);
    
    if (canonicalFile.string().find(canonicalBase.string()) != 0) {
        throw std::runtime_error("Invalid path");
    }
    
    std::ifstream file(canonicalFile);
    std::string content((std::istreambuf_iterator<char>(file)),
                        std::istreambuf_iterator<char>());
    return content;
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
std::string hashPassword(const std::string& password) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, password.c_str(), password.length());
    SHA256_Final(hash, &sha256);
    
    std::stringstream ss;
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        ss << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
    }
    return ss.str();
}

// ✅ SAFE: Secure random (should NOT be flagged)
std::string generateToken() {
    unsigned char randomBytes[32];
    if (RAND_bytes(randomBytes, 32) != 1) {
        throw std::runtime_error("Random generation failed");
    }
    
    std::stringstream ss;
    for (int i = 0; i < 32; i++) {
        ss << std::hex << std::setw(2) << std::setfill('0') << (int)randomBytes[i];
    }
    return ss.str();
}

// ✅ SAFE: Safe string copy with bounds checking (should NOT be flagged)
void copyStringSafe(char* dest, size_t destSize, const char* src) {
    strncpy(dest, src, destSize - 1); // Safe - with bounds checking
    dest[destSize - 1] = '\0';
}

// ✅ SAFE: Safe format string (should NOT be flagged)
void printUserInput(const char* input) {
    printf("%s", input); // Safe - format string is literal
}

