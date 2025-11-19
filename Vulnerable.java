/**
 * Vulnerable Java code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.sql.*;
import java.io.*;
import java.nio.file.*;
import java.security.MessageDigest;

public class Vulnerable {
    
    // SQL Injection vulnerability
    public ResultSet getUserData(String userId) throws SQLException {
        String query = "SELECT * FROM users WHERE id = " + userId;
        Statement stmt = connection.createStatement();
        return stmt.executeQuery(query);
    }
    
    // SQL Injection with string formatting
    public ResultSet searchUsers(String searchTerm) throws SQLException {
        String query = String.format("SELECT * FROM users WHERE name LIKE '%s'", searchTerm);
        Statement stmt = connection.createStatement();
        return stmt.executeQuery(query);
    }
    
    // Command Injection
    public void executeCommand(String command) throws IOException {
        Runtime.getRuntime().exec(command);
    }
    
    // Hardcoded secrets
    private static final String API_KEY = "sk_live_51H3ll0W0rld123456789";
    private static final String PASSWORD = "admin123";
    private static final String SECRET = "mySecretKey123";
    
    // Path Traversal
    public String readFile(String filename) throws IOException {
        return new String(Files.readAllBytes(Paths.get("/var/www/data/" + filename)));
    }
    
    // Weak crypto - MD5
    public String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(password.getBytes());
        return bytesToHex(hash);
    }
    
    // Insecure deserialization
    public Object deserializeData(byte[] data) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
        return ois.readObject();
    }
    
    // XSS vulnerability
    public void displayMessage(String message) {
        response.getWriter().println("<div>" + message + "</div>");
    }
    
    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

