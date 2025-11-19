# Multi-Language SAST Test Guide

## Overview

This test repository contains intentionally vulnerable code samples across 12 programming languages to validate the SAST scanner's detection capabilities.

## Test Structure

```
multi-lang-test/
├── javascript/     - JavaScript vulnerabilities
├── typescript/     - TypeScript vulnerabilities
├── python/         - Python vulnerabilities
├── java/           - Java vulnerabilities
├── csharp/         - C# vulnerabilities
├── php/            - PHP vulnerabilities
├── go/             - Go vulnerabilities
├── ruby/           - Ruby vulnerabilities
├── cpp/            - C/C++ vulnerabilities
├── rust/           - Rust vulnerabilities
├── kotlin/         - Kotlin vulnerabilities
└── swift/          - Swift vulnerabilities
```

## Vulnerability Types Tested

### 1. SQL Injection
- **Languages**: JavaScript, TypeScript, Python, Java, C#, PHP, Go, Ruby, Kotlin, Swift
- **Pattern**: String concatenation or formatting in SQL queries
- **Example**: `"SELECT * FROM users WHERE id = " + userId`

### 2. Cross-Site Scripting (XSS)
- **Languages**: JavaScript, TypeScript, Java, C#, PHP, Ruby, Kotlin
- **Pattern**: Direct HTML injection via innerHTML, document.write, or template rendering
- **Example**: `element.innerHTML = userInput`

### 3. Command Injection
- **Languages**: JavaScript, TypeScript, Python, Java, C#, PHP, Go, Ruby, C/C++, Rust, Kotlin, Swift
- **Pattern**: Unsafe command execution via system(), exec(), Runtime.exec(), etc.
- **Example**: `system(command)` or `exec(command)`

### 4. Code Injection
- **Languages**: JavaScript, Python, PHP, Ruby
- **Pattern**: Use of eval(), exec(), or Function constructor
- **Example**: `eval(userInput)` or `exec(code)`

### 5. Hardcoded Secrets
- **Languages**: All languages
- **Pattern**: API keys, passwords, secrets in source code
- **Example**: `const API_KEY = "sk_live_51H3ll0W0rld123456789"`

### 6. Path Traversal
- **Languages**: JavaScript, TypeScript, Python, Java, C#, PHP, Go, Ruby, C/C++, Rust, Kotlin, Swift
- **Pattern**: Unsafe file path construction
- **Example**: `"/var/www/data/" + filename`

### 7. Weak Cryptography
- **Languages**: JavaScript, TypeScript, Python, Java, C#, PHP, Go, Ruby, C/C++, Rust, Kotlin, Swift
- **Pattern**: Use of MD5, weak random number generation
- **Example**: `crypto.createHash('md5')` or `Math.random()`

### 8. Insecure Deserialization
- **Languages**: Python, Java, C#, Ruby, Kotlin
- **Pattern**: Unsafe deserialization (pickle, ObjectInputStream, etc.)
- **Example**: `pickle.loads(data)` or `ObjectInputStream.readObject()`

### 9. Buffer Overflow (C/C++)
- **Languages**: C/C++
- **Pattern**: Unsafe string operations without bounds checking
- **Example**: `strcpy(dest, src)`

## Running Tests

### Basic Test
```bash
cd workers/test-repos/multi-lang-test
node test-sast-multi-lang.js
```

### From Workers Directory
```bash
cd workers
node test-repos/multi-lang-test/test-sast-multi-lang.js
```

### Expected Output

The test runner will:
1. Scan all files in the test repository
2. Detect all supported languages
3. Report findings grouped by:
   - Language
   - Category (vulnerability type)
   - Severity (critical, high, medium, low, info)
4. Display sample findings with code snippets
5. Validate that expected languages and categories are detected

## Expected Results

### Language Detection
- ✅ All 12 languages should be detected
- ✅ File counts should match actual files

### Vulnerability Detection
- ✅ SQL Injection findings in multiple languages
- ✅ XSS findings in web languages
- ✅ Command Injection findings across languages
- ✅ Hardcoded secrets in all languages
- ✅ Path Traversal findings
- ✅ Weak cryptography findings

### Severity Distribution
- Hardcoded secrets: **HIGH** or **CRITICAL**
- SQL Injection: **HIGH** or **CRITICAL**
- Command Injection: **HIGH** or **CRITICAL**
- XSS: **MEDIUM** to **HIGH**
- Path Traversal: **MEDIUM** to **HIGH**
- Weak Crypto: **MEDIUM**

## Test Validation

The test script automatically validates:
1. ✅ All expected languages are detected
2. ✅ Vulnerabilities are found (total findings > 0)
3. ✅ Expected vulnerability categories are present
4. ✅ Findings are properly categorized and have severity levels

## Troubleshooting

### No Findings Detected
- Check that rules are properly configured in `workers/rules/`
- Verify AST parsers are available for each language
- Check console logs for parsing errors

### Missing Languages
- Verify file extensions match language mapping
- Check that files are not in ignored directories (test/, node_modules/, etc.)
- Ensure minimum file count threshold is met (3 files or 1% of total)

### False Positives
- Review rule patterns in `workers/rules/{language}/security.yaml`
- Check context filtering and sanitization detection
- Adjust confidence thresholds if needed

## Next Steps

1. **Add More Test Cases**: Expand with additional vulnerability patterns
2. **Performance Testing**: Test with larger codebases
3. **False Positive Analysis**: Review and refine rules based on results
4. **Coverage Analysis**: Ensure all rule types are tested
5. **Integration Testing**: Test with real-world repositories

## Notes

- These are **intentionally vulnerable** code samples for testing only
- **DO NOT** use these patterns in production code
- All vulnerabilities should be detected by the SAST scanner
- Test files are excluded from production scans (test/ directory is ignored)

