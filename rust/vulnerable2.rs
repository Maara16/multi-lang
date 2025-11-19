/**
 * Additional vulnerable Rust code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

use std::process::Command;
use std::fs;

// SQL Injection (if using string concatenation)
fn build_search_query(search_term: &str) -> String {
    format!("SELECT * FROM users WHERE name LIKE '%{}%'", search_term)
}

// Hardcoded secrets
const DB_PASSWORD: &str = "admin123";
const API_KEY: &str = "sk_live_51H3ll0W0rld123456789";

// Command Injection
fn run_command(cmd: &str) -> std::io::Result<()> {
    Command::new("sh")
        .arg("-c")
        .arg(cmd)
        .output()?;
    Ok(())
}

// Path Traversal
fn read_config_file(filename: &str) -> std::io::Result<String> {
    fs::read_to_string(format!("/etc/config/{}", filename))
}

