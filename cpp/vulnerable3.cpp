/**
 * Additional vulnerable C++ code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

#include <iostream>
#include <cstring>
#include <openssl/md5.h>

// Hardcoded secrets
const char* SECRET_KEY = "mySecretKey123";
const char* JWT_SECRET = "jwtSecretKey456";

// Weak crypto - MD5
std::string hashPassword(const std::string& password) {
    unsigned char digest[MD5_DIGEST_LENGTH];
    MD5((unsigned char*)password.c_str(), password.length(), digest);
    
    char mdString[33];
    for (int i = 0; i < 16; i++)
        sprintf(&mdString[i*2], "%02x", (unsigned int)digest[i]);
    
    return std::string(mdString);
}

// Buffer overflow
void copyStringUnsafe(char* dest, const char* src) {
    strcpy(dest, src);  // Unsafe - no bounds checking
}

// Format string vulnerability
void printUserInput(const char* input) {
    printf(input);  // Unsafe format string
}

