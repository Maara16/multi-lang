/**
 * @fileoverview Vulnerable JavaScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

// SQL Injection vulnerability
function getUserData(userId) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return db.query(query);
}

// XSS vulnerability - innerHTML
function displayMessage(message) {
  document.getElementById('message').innerHTML = message;
}

// XSS vulnerability - dangerouslySetInnerHTML (React)
function ReactComponent({ userInput }) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}

// Command Injection
function executeCommand(command) {
  const exec = require('child_process').exec;
  exec(command, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

// Code Injection - eval
function processData(data) {
  return eval(data);
}

// Code Injection - Function constructor
function createFunction(code) {
  return new Function(code);
}

// Hardcoded secrets
const apiKey = 'sk_live_51H3ll0W0rld123456789';
const password = 'admin123';
const secret = 'mySecretKey123';

// Path Traversal
function readFile(filename) {
  const fs = require('fs');
  return fs.readFileSync('/var/www/data/' + filename, 'utf8');
}

// Insecure random number generation
function generateToken() {
  return Math.random().toString(36);
}

// Weak crypto - MD5
const crypto = require('crypto');
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// Unsafe deserialization
function deserializeData(data) {
  return JSON.parse(data);
}

// document.write XSS
function writeContent(content) {
  document.write(content);
}

// Unsafe URL redirect
function redirect(url) {
  window.location.href = url;
}

