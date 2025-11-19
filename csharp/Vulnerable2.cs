/**
 * Additional vulnerable C# code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

using System;
using System.Data.SqlClient;

public class Vulnerable2
{
    // SQL Injection
    public void SearchUsers(string searchTerm)
    {
        string query = "SELECT * FROM users WHERE name LIKE '%" + searchTerm + "%'";
        SqlCommand cmd = new SqlCommand(query, connection);
        cmd.ExecuteReader();
    }
    
    // Hardcoded secrets
    private const string DB_PASSWORD = "admin123";
    private const string API_KEY = "sk_live_51H3ll0W0rld123456789";
    
    // Command Injection
    public void RunCommand(string command)
    {
        System.Diagnostics.Process.Start(command);
    }
    
    // Path Traversal
    public string ReadConfigFile(string filename)
    {
        return System.IO.File.ReadAllText("/etc/config/" + filename);
    }
}

