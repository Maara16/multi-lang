/**
 * @fileoverview Additional vulnerable TypeScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

import { exec } from 'child_process';

// SQL Injection
function getUserById(id: string): Promise<any> {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  return db.query(query);
}

// Hardcoded secrets
const DATABASE_URL = 'postgresql://user:password123@localhost:5432/mydb';
const JWT_SECRET = 'mySuperSecretJWTKey123';

// Command Injection
function executeShellCommand(cmd: string): void {
  exec(cmd, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

