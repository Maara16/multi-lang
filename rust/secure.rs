/**
 * Secure Rust code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

use std::process::Command;
use std::fs;
use std::path::{Path, PathBuf};
use sha2::{Sha256, Digest};
use rand::Rng;

// ✅ SAFE: Parameterized SQL query (using prepared statements - should NOT be flagged)
fn build_query(user_id: &str) -> String {
    // In real code, this would use prepared statements (e.g., diesel, sqlx)
    format!("SELECT * FROM users WHERE id = $1") // Placeholder for prepared statement
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
fn execute_command(cmd: &str) -> std::io::Result<()> {
    let allowed_commands = vec!["ls", "pwd", "date"];
    if allowed_commands.contains(&cmd) {
        Command::new(cmd).output()?;
    }
    Ok(())
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
fn get_api_key() -> Option<String> {
    std::env::var("API_KEY").ok()
}

fn get_password() -> Option<String> {
    std::env::var("DB_PASSWORD").ok()
}

// ✅ SAFE: Path validation before file access (should NOT be flagged)
fn read_file(filename: &str) -> std::io::Result<String> {
    let base_path = PathBuf::from("/var/www/data");
    let file_path = base_path.join(Path::new(filename).file_name().unwrap());
    
    // Validate path
    let canonical_base = base_path.canonicalize()?;
    let canonical_file = file_path.canonicalize()?;
    
    if !canonical_file.starts_with(&canonical_base) {
        return Err(std::io::Error::new(
            std::io::ErrorKind::PermissionDenied,
            "Invalid path"
        ));
    }
    
    fs::read_to_string(canonical_file)
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
fn hash_password(password: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(password.as_bytes());
    format!("{:x}", hasher.finalize())
}

// ✅ SAFE: Secure random (should NOT be flagged)
fn generate_token() -> String {
    let mut rng = rand::thread_rng();
    let bytes: Vec<u8> = (0..32).map(|_| rng.gen()).collect();
    hex::encode(bytes)
}

// ✅ SAFE: Safe unwrap with error handling (should NOT be flagged)
fn get_value() -> Result<i32, String> {
    let result: Option<i32> = Some(42);
    result.ok_or_else(|| "Value not found".to_string())
}

// ✅ SAFE: Command execution with validation (should NOT be flagged)
fn run_command_safe(cmd: &str) -> std::io::Result<()> {
    let parts: Vec<&str> = cmd.split_whitespace().collect();
    if parts.is_empty() {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "Empty command"
        ));
    }
    
    let allowed_commands = vec!["ls", "pwd", "date"];
    if allowed_commands.contains(&parts[0]) {
        Command::new(parts[0])
            .args(&parts[1..])
            .output()?;
    }
    Ok(())
}

