/**
 * Additional vulnerable Java code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.security.MessageDigest;
import java.io.*;

public class Vulnerable3 {
    
    // Hardcoded secrets
    private static final String SECRET_KEY = "mySecretKey123";
    private static final String JWT_SECRET = "jwtSecretKey456";
    
    // Weak crypto - MD5
    public String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(password.getBytes());
        return bytesToHex(hash);
    }
    
    // Insecure deserialization
    public Object deserialize(byte[] data) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
        return ois.readObject();
    }
    
    // XSS
    public void renderContent(String content) {
        response.getWriter().println(content);
    }
    
    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

