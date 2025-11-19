# False Positive Testing Guide

## Overview

This test repository includes both **vulnerable** and **secure** code samples to test the SAST scanner's false positive rate.

## File Classification

### Vulnerable Files (Should be flagged)
- `vulnerable.js/ts/py/etc` - Original vulnerable code
- `vulnerable2.js/ts/py/etc` - Additional vulnerable code
- `vulnerable3.js/ts/py/etc` - Additional vulnerable code

**Expected**: These files should trigger security findings (True Positives)

### Secure Files (Should NOT be flagged)
- `secure.js/ts/py/etc` - Secure implementations

**Expected**: These files should NOT trigger security findings (False Positives if they do)

## Secure Code Patterns Tested

### 1. Parameterized SQL Queries
- ✅ Uses prepared statements with placeholders
- ✅ Binds parameters safely
- ❌ Should NOT flag parameterized queries

### 2. Safe HTML Rendering
- ✅ Uses `textContent` instead of `innerHTML`
- ✅ Uses HTML escaping (DOMPurify, htmlspecialchars, etc.)
- ✅ React auto-escaping
- ❌ Should NOT flag safe HTML rendering

### 3. Validated Command Execution
- ✅ Command whitelist validation
- ✅ No direct user input to system commands
- ❌ Should NOT flag validated command execution

### 4. Safe Data Processing
- ✅ Uses `JSON.parse()` instead of `eval()`
- ✅ No code execution functions
- ❌ Should NOT flag safe data processing

### 5. Environment Variables for Secrets
- ✅ Secrets loaded from environment variables
- ✅ No hardcoded credentials
- ❌ Should NOT flag environment variable usage

### 6. Path Validation
- ✅ Path normalization and validation
- ✅ Prevents directory traversal
- ❌ Should NOT flag validated file paths

### 7. Strong Cryptography
- ✅ SHA-256, bcrypt, secure random
- ✅ No MD5 or weak algorithms
- ❌ Should NOT flag strong crypto

### 8. Safe Deserialization
- ✅ Uses safe deserialization methods
- ✅ Input validation
- ❌ Should NOT flag safe deserialization

## False Positive Rate Calculation

```
False Positive Rate = (Findings in secure files / Total findings) × 100%
```

### Target Metrics

- **Excellent**: < 5% false positive rate
- **Acceptable**: 5-10% false positive rate
- **Needs Improvement**: > 10% false positive rate
- **Perfect**: 0% false positive rate

## Running False Positive Tests

```bash
cd /home/maara/Project/vigilnz/frontend/workers
node test-repos/multi-lang-test/test-sast-multi-lang.js
```

The test runner will automatically:
1. ✅ Identify secure files (files with "secure" in name)
2. ✅ Identify vulnerable files (files with "vulnerable" in name)
3. ✅ Classify findings as True Positives or False Positives
4. ✅ Calculate false positive rate
5. ✅ Display detailed analysis by language and category

## Interpreting Results

### Good Results
- ✅ High true positive rate in vulnerable files
- ✅ Low/zero false positive rate in secure files
- ✅ Findings correctly categorized by severity

### Issues to Address
- ❌ High false positive rate (> 10%)
- ❌ Secure code being flagged
- ❌ Missing detections in vulnerable files

## Improving False Positive Rate

If false positives are detected:

1. **Review Rule Patterns**: Ensure rules don't match safe patterns
2. **Add Context Awareness**: Rules should understand code context
3. **Sanitization Detection**: Rules should detect sanitization methods
4. **Confidence Scoring**: Lower confidence for ambiguous patterns
5. **Whitelist Patterns**: Add safe pattern exceptions

## Example Secure Patterns

### SQL Injection Prevention
```javascript
// ✅ SAFE - Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// ❌ VULNERABLE - String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);
```

### XSS Prevention
```javascript
// ✅ SAFE - textContent
element.textContent = userInput;

// ❌ VULNERABLE - innerHTML
element.innerHTML = userInput;
```

### Command Injection Prevention
```javascript
// ✅ SAFE - Whitelist validation
const allowed = ['ls', 'pwd'];
if (allowed.includes(command)) {
  exec(command);
}

// ❌ VULNERABLE - Direct execution
exec(userInput);
```

## Notes

- Secure files are marked with `✅ SAFE` comments
- Vulnerable files are marked with `❌ VULNERABLE` comments
- Test files are intentionally simple to clearly demonstrate patterns
- Real-world code may have more complex scenarios

