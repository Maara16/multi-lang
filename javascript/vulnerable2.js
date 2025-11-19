/**
 * @fileoverview Additional vulnerable JavaScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

// SQL Injection with template literals
function searchUsers(searchTerm) {
  const query = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%'`;
  return db.query(query);
}

// Hardcoded credentials
const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: 'password123',
  database: 'mydb'
};

// XSS - React dangerouslySetInnerHTML
function UserProfile({ bio }) {
  return <div dangerouslySetInnerHTML={{ __html: bio }} />;
}

// Command Injection with child_process
const { spawn } = require('child_process');
function runScript(scriptName) {
  spawn('sh', ['-c', scriptName]);
}

