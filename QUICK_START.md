# Quick Start Guide - Multi-Language SAST Testing

## Run the Test

```bash
# From the workers directory
cd /home/maara/Project/vigilnz/frontend/workers
node test-repos/multi-lang-test/test-sast-multi-lang.js
```

## What Gets Tested

✅ **12 Programming Languages**:
- JavaScript, TypeScript, Python, Java, C#, PHP, Go, Ruby, C/C++, Rust, Kotlin, Swift

✅ **9 Vulnerability Types**:
- SQL Injection
- Cross-Site Scripting (XSS)
- Command Injection
- Code Injection (eval/exec)
- Hardcoded Secrets
- Path Traversal
- Weak Cryptography
- Insecure Deserialization
- Buffer Overflow (C/C++)

## Expected Output

The test will:
1. ✅ Detect all 12 languages
2. ✅ Find vulnerabilities in each language
3. ✅ Group findings by language and category
4. ✅ Display severity distribution
5. ✅ Show sample findings with code snippets

## Test Files

- `javascript/vulnerable.js` - 10+ vulnerabilities
- `typescript/vulnerable.ts` - 7+ vulnerabilities
- `python/vulnerable.py` - 12+ vulnerabilities
- `java/Vulnerable.java` - 8+ vulnerabilities
- `csharp/Vulnerable.cs` - 8+ vulnerabilities
- `php/vulnerable.php` - 12+ vulnerabilities
- `go/vulnerable.go` - 6+ vulnerabilities
- `ruby/vulnerable.rb` - 10+ vulnerabilities
- `cpp/vulnerable.cpp` - 6+ vulnerabilities
- `rust/vulnerable.rs` - 6+ vulnerabilities
- `kotlin/Vulnerable.kt` - 8+ vulnerabilities
- `swift/vulnerable.swift` - 6+ vulnerabilities

**Total: 100+ intentional vulnerabilities across 12 languages**

## Success Criteria

✅ All languages detected  
✅ Total findings > 0  
✅ Expected categories present (injection, xss, hardcoded secrets, etc.)  
✅ Findings have proper severity levels  
✅ Code snippets included in findings

## Troubleshooting

**No findings?**
- Check `workers/rules/` directory for rule files
- Verify AST parsers are installed
- Check console for parsing errors

**Missing languages?**
- Ensure file extensions match (e.g., `.js`, `.py`, `.java`)
- Check minimum file count threshold (3 files or 1%)

**Need more details?**
- See `TEST_GUIDE.md` for comprehensive documentation
- Check console output for detailed logs

