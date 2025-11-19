/**
 * Additional vulnerable Java code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.sql.*;
import java.io.*;

public class Vulnerable2 {
    
    // SQL Injection
    public ResultSet searchUsers(String searchTerm) throws SQLException {
        String query = "SELECT * FROM users WHERE name LIKE '%" + searchTerm + "%'";
        Statement stmt = connection.createStatement();
        return stmt.executeQuery(query);
    }
    
    // Hardcoded secrets
    private static final String DB_PASSWORD = "admin123";
    private static final String API_KEY = "sk_live_51H3ll0W0rld123456789";
    
    // Command Injection
    public void runCommand(String command) throws IOException {
        Runtime.getRuntime().exec(command);
    }
    
    // Path Traversal
    public String readConfigFile(String filename) throws IOException {
        return new String(Files.readAllBytes(Paths.get("/etc/config/" + filename)));
    }
}

