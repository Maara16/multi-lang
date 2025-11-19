# Multi-Language SAST Test Repository

This repository contains vulnerable code samples in multiple programming languages to test the SAST scanner's detection capabilities.

## Supported Languages

- JavaScript/TypeScript
- Python
- Java
- C#
- PHP
- Go
- Ruby
- C/C++
- Rust
- Kotlin
- Swift

## Vulnerability Types Tested

- SQL Injection
- Cross-Site Scripting (XSS)
- Command Injection
- Code Injection (eval/exec)
- Hardcoded Secrets
- Path Traversal
- Insecure Deserialization
- Broken Authentication
- Cryptographic Issues

## Test File Structure

Each language has **4 files** (3 vulnerable + 1 secure) to meet the minimum threshold and test false positive rates:

- `javascript/` - 3 vulnerable + 1 secure (15+ vulnerabilities, 10+ secure patterns)
- `typescript/` - 3 vulnerable + 1 secure (12+ vulnerabilities, 7+ secure patterns)
- `python/` - 3 vulnerable + 1 secure (18+ vulnerabilities, 12+ secure patterns)
- `java/` - 3 vulnerable + 1 secure (15+ vulnerabilities, 8+ secure patterns)
- `csharp/` - 3 vulnerable + 1 secure (15+ vulnerabilities, 8+ secure patterns)
- `php/` - 3 vulnerable + 1 secure (18+ vulnerabilities, 12+ secure patterns)
- `go/` - 3 vulnerable + 1 secure (12+ vulnerabilities, 6+ secure patterns)
- `ruby/` - 3 vulnerable + 1 secure (15+ vulnerabilities, 10+ secure patterns)
- `cpp/` - 3 vulnerable + 1 secure (12+ vulnerabilities, 6+ secure patterns)
- `rust/` - 3 vulnerable + 1 secure (12+ vulnerabilities, 6+ secure patterns)
- `kotlin/` - 3 vulnerable + 1 secure (15+ vulnerabilities, 8+ secure patterns)
- `swift/` - 3 vulnerable + 1 secure (12+ vulnerabilities, 6+ secure patterns)

**Total: 48 files**
- **36 vulnerable files** with 170+ intentional vulnerabilities (should be flagged)
- **12 secure files** with safe implementations (should NOT be flagged)

### File Types

- **Vulnerable Files**: `vulnerable.js`, `vulnerable2.js`, `vulnerable3.js` - Should trigger findings
- **Secure Files**: `secure.js` - Should NOT trigger findings (tests false positive rate)

### Why 3+ Files Per Language?

The SAST scanner filters out languages with fewer than 3 files (or less than 1% of total files) to avoid false positives from small code samples. Each language has at least 3 files to meet this threshold.

## Running Tests

Use the test runner script:
```bash
cd /home/maara/Project/vigilnz/frontend/workers
node test-repos/multi-lang-test/test-sast-multi-lang.js
```

