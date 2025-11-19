/**
 * @fileoverview Vulnerable TypeScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

import { exec } from 'child_process';
import * as fs from 'fs';

// SQL Injection vulnerability
function getUserData(userId: string): Promise<any> {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return db.query(query);
}

// XSS vulnerability
function displayMessage(message: string): void {
  const element = document.getElementById('message');
  if (element) {
    element.innerHTML = message;
  }
}

// Command Injection
function executeCommand(command: string): void {
  exec(command, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

// Hardcoded secrets
const API_KEY: string = 'sk_live_51H3ll0W0rld123456789';
const DB_PASSWORD: string = 'superSecret123';
const JWT_SECRET: string = 'myJWTSecretKey';

// Path Traversal
function readFile(filename: string): string {
  return fs.readFileSync('/var/www/data/' + filename, 'utf8');
}

// Weak crypto
import * as crypto from 'crypto';
function hashPassword(password: string): string {
  return crypto.createHash('md5').update(password).digest('hex');
}

// Unsafe deserialization
function deserializeData(data: string): any {
  return JSON.parse(data);
}

