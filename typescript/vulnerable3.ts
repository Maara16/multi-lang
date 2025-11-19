/**
 * @fileoverview Additional vulnerable TypeScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

// Hardcoded API keys
const API_KEYS = {
  stripe: 'sk_live_51H3ll0W0rld123456789',
  aws: 'AKIAIOSFODNN7EXAMPLE',
  github: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
};

// Path Traversal
import * as fs from 'fs';
function readUserFile(username: string, filename: string): string {
  return fs.readFileSync(`/home/${username}/files/${filename}`, 'utf8');
}

// Weak crypto
import * as crypto from 'crypto';
function hashData(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}

