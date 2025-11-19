/**
 * @fileoverview Additional vulnerable JavaScript code samples for SAST testing
 * @author Test Suite
 * @created 2025-01-21
 */

// Hardcoded API keys
const STRIPE_KEY = 'sk_live_51H3ll0W0rld123456789';
const AWS_SECRET = 'AKIAIOSFODNN7EXAMPLE';
const GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuvwxyz';

// XSS - jQuery html()
function updateContent(html) {
  $('#content').html(html);
}

// Unsafe URL redirect
function handleRedirect(url) {
  window.location = url;
}

// Weak crypto - Math.random()
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

