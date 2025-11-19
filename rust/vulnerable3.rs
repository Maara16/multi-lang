/**
 * Additional vulnerable Rust code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

use md5::{Md5, Digest};

// Hardcoded secrets
const SECRET_KEY: &str = "mySecretKey123";
const JWT_SECRET: &str = "jwtSecretKey456";

// Weak crypto - MD5
fn hash_password(password: &str) -> String {
    let mut hasher = Md5::new();
    hasher.update(password.as_bytes());
    format!("{:x}", hasher.finalize())
}

// Unsafe unwrap
fn get_value() -> i32 {
    let result: Option<i32> = Some(42);
    result.unwrap()  // Could panic if None
}

// Command Injection
fn execute_shell(cmd: &str) -> std::io::Result<()> {
    std::process::Command::new("bash")
        .arg("-c")
        .arg(cmd)
        .spawn()?;
    Ok(())
}

