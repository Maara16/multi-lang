/**
 * @fileoverview Secure TypeScript code samples for SAST false positive testing
 * @description These are SAFE implementations that should NOT be flagged
 * @author Test Suite
 * @created 2025-01-21
 */

import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// ✅ SAFE: Parameterized SQL query (should NOT be flagged)
function getUserData(userId: string): Promise<any> {
  const query = 'SELECT * FROM users WHERE id = ?';
  return db.query(query, [userId]); // Parameterized query
}

// ✅ SAFE: Using textContent instead of innerHTML (should NOT be flagged)
function displayMessage(message: string): void {
  const element = document.getElementById('message');
  if (element) {
    element.textContent = message; // Safe - no HTML rendering
  }
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
function executeCommand(command: string): void {
  const allowedCommands = ['ls', 'pwd', 'date'];
  if (allowedCommands.includes(command)) {
    exec(command, (error, stdout, stderr) => {
      console.log(stdout);
    });
  }
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
const API_KEY: string = process.env.API_KEY || '';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
const JWT_SECRET: string = process.env.JWT_SECRET || '';

// ✅ SAFE: Path validation before file access (should NOT be flagged)
function readFile(filename: string): string {
  const safePath = path.join('/var/www/data', path.basename(filename));
  if (!safePath.startsWith('/var/www/data')) {
    throw new Error('Invalid path');
  }
  return fs.readFileSync(safePath, 'utf8');
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// ✅ SAFE: Secure random (should NOT be flagged)
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

