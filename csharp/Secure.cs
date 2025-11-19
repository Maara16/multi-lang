/**
 * Secure C# code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

using System;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;

public class Secure
{
    // ✅ SAFE: Parameterized SQL query (should NOT be flagged)
    public void GetUserData(string userId)
    {
        string query = "SELECT * FROM users WHERE id = @userId";
        SqlCommand cmd = new SqlCommand(query, connection);
        cmd.Parameters.AddWithValue("@userId", userId); // Parameterized query
        cmd.ExecuteReader();
    }
    
    // ✅ SAFE: Parameterized SQL with LIKE (should NOT be flagged)
    public void SearchUsers(string searchTerm)
    {
        string query = "SELECT * FROM users WHERE name LIKE @searchTerm";
        SqlCommand cmd = new SqlCommand(query, connection);
        cmd.Parameters.AddWithValue("@searchTerm", "%" + searchTerm + "%");
        cmd.ExecuteReader();
    }
    
    // ✅ SAFE: Command execution with whitelist (should NOT be flagged)
    public void ExecuteCommand(string command)
    {
        string[] allowedCommands = { "ls", "pwd", "date" };
        if (Array.Exists(allowedCommands, cmd => cmd == command))
        {
            Process.Start(command);
        }
    }
    
    // ✅ SAFE: Secrets from environment variables (should NOT be flagged)
    private static readonly string API_KEY = Environment.GetEnvironmentVariable("API_KEY");
    private static readonly string PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD");
    private static readonly string SECRET = Environment.GetEnvironmentVariable("SECRET_KEY");
    
    // ✅ SAFE: Path validation before file access (should NOT be flagged)
    public string ReadFile(string filename)
    {
        string basePath = "/var/www/data";
        string fullPath = Path.Combine(basePath, Path.GetFileName(filename));
        if (!fullPath.StartsWith(basePath))
        {
            throw new SecurityException("Invalid path");
        }
        return File.ReadAllText(fullPath);
    }
    
    // ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
    public string HashPassword(string password)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }
    
    // ✅ SAFE: Secure random (should NOT be flagged)
    public string GenerateToken()
    {
        byte[] bytes = new byte[32];
        using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(bytes);
        }
        return Convert.ToBase64String(bytes);
    }
    
    // ✅ SAFE: XSS prevention with encoding (should NOT be flagged)
    public void DisplayMessage(string message)
    {
        string escaped = HttpUtility.HtmlEncode(message);
        HttpContext.Current.Response.Write("<div>" + escaped + "</div>");
    }
}

