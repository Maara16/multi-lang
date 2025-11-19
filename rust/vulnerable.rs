/**
 * Vulnerable Rust code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

use std::process::Command;
use std::fs;
use std::path::PathBuf;
use md5::{Md5, Digest};

// SQL Injection vulnerability (if using string concatenation)
fn get_user_data(user_id: &str) -> String {
    format!("SELECT * FROM users WHERE id = {}", user_id)
}

// Command Injection
fn execute_command(command: &str) -> std::io::Result<()> {
    Command::new("sh")
        .arg("-c")
        .arg(command)
        .output()?;
    Ok(())
}

// Hardcoded secrets
const API_KEY: &str = "sk_live_51H3ll0W0rld123456789";
const PASSWORD: &str = "admin123";
const SECRET: &str = "mySecretKey123";

// Path Traversal
fn read_file(filename: &str) -> std::io::Result<String> {
    let path = PathBuf::from("/var/www/data").join(filename);
    fs::read_to_string(path)
}

// Weak crypto - MD5
fn hash_password(password: &str) -> String {
    let mut hasher = Md5::new();
    hasher.update(password.as_bytes());
    format!("{:x}", hasher.finalize())
}

// Unsafe unwrap (potential panic)
fn get_value() -> i32 {
    let result: Option<i32> = Some(42);
    result.unwrap()  // Could panic if None
}

// Command Injection with Command::new
fn run_command(cmd: &str) -> std::io::Result<()> {
    Command::new("bash")
        .arg("-c")
        .arg(cmd)
        .spawn()?;
    Ok(())
}

