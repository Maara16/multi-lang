/**
 * @fileoverview Secure JavaScript code samples for SAST false positive testing
 * @description These are SAFE implementations that should NOT be flagged
 * @author Test Suite
 * @created 2025-01-21
 */

// ✅ SAFE: Parameterized SQL query (should NOT be flagged)
function getUserData(userId) {
  const query = 'SELECT * FROM users WHERE id = ?';
  return db.query(query, [userId]); // Parameterized query
}

// ✅ SAFE: Using textContent instead of innerHTML (should NOT be flagged)
function displayMessage(message) {
  const element = document.getElementById('message');
  if (element) {
    element.textContent = message; // Safe - no HTML rendering
  }
}

// ✅ SAFE: React without dangerouslySetInnerHTML (should NOT be flagged)
function ReactComponent({ userInput }) {
  return <div>{userInput}</div>; // Safe - React auto-escapes
}

// ✅ SAFE: Command execution with validation (should NOT be flagged)
function executeCommand(command) {
  const allowedCommands = ['ls', 'pwd', 'date'];
  if (allowedCommands.includes(command)) {
    const exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
      console.log(stdout);
    });
  }
}

// ✅ SAFE: Using JSON.parse instead of eval (should NOT be flagged)
function processData(data) {
  try {
    return JSON.parse(data); // Safe - only parses JSON
  } catch (e) {
    return null;
  }
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
const apiKey = process.env.API_KEY;
const password = process.env.DB_PASSWORD;
const secret = process.env.SECRET_KEY;

// ✅ SAFE: Path validation before file access (should NOT be flagged)
const path = require('path');
function readFile(filename) {
  const safePath = path.join('/var/www/data', path.basename(filename));
  if (!safePath.startsWith('/var/www/data')) {
    throw new Error('Invalid path');
  }
  const fs = require('fs');
  return fs.readFileSync(safePath, 'utf8');
}

// ✅ SAFE: Strong crypto - bcrypt (should NOT be flagged)
const bcrypt = require('bcrypt');
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// ✅ SAFE: Secure random number generation (should NOT be flagged)
const crypto = require('crypto');
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// ✅ SAFE: Sanitized HTML output (should NOT be flagged)
const DOMPurify = require('isomorphic-dompurify');
function displayHTML(html) {
  const clean = DOMPurify.sanitize(html);
  document.getElementById('content').innerHTML = clean;
}

// ✅ SAFE: Validated URL redirect (should NOT be flagged)
function redirect(url) {
  const allowedDomains = ['example.com', 'trusted-site.com'];
  try {
    const urlObj = new URL(url);
    if (allowedDomains.includes(urlObj.hostname)) {
      window.location.href = url;
    }
  } catch (e) {
    console.error('Invalid URL');
  }
}

