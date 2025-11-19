/**
 * Vulnerable C# code samples for SAST testing
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

public class Vulnerable
{
    // SQL Injection vulnerability
    public void GetUserData(string userId)
    {
        string query = "SELECT * FROM users WHERE id = " + userId;
        SqlCommand cmd = new SqlCommand(query, connection);
        cmd.ExecuteReader();
    }
    
    // SQL Injection with string formatting
    public void SearchUsers(string searchTerm)
    {
        string query = string.Format("SELECT * FROM users WHERE name LIKE '{0}'", searchTerm);
        SqlCommand cmd = new SqlCommand(query, connection);
        cmd.ExecuteReader();
    }
    
    // Command Injection
    public void ExecuteCommand(string command)
    {
        Process.Start(command);
    }
    
    // Hardcoded secrets
    private const string API_KEY = "sk_live_51H3ll0W0rld123456789";
    private const string PASSWORD = "admin123";
    private const string SECRET = "mySecretKey123";
    
    // Path Traversal
    public string ReadFile(string filename)
    {
        return File.ReadAllText("/var/www/data/" + filename);
    }
    
    // Weak crypto - MD5
    public string HashPassword(string password)
    {
        using (MD5 md5 = MD5.Create())
        {
            byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }
    
    // Insecure deserialization
    public object DeserializeData(byte[] data)
    {
        using (MemoryStream ms = new MemoryStream(data))
        {
            System.Runtime.Serialization.Formatters.Binary.BinaryFormatter formatter = 
                new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            return formatter.Deserialize(ms);
        }
    }
    
    // XSS vulnerability
    public void DisplayMessage(string message)
    {
        HttpContext.Current.Response.Write("<div>" + message + "</div>");
    }
}

