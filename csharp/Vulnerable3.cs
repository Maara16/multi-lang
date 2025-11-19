/**
 * Additional vulnerable C# code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

using System;
using System.Security.Cryptography;
using System.Text;

public class Vulnerable3
{
    // Hardcoded secrets
    private const string SECRET_KEY = "mySecretKey123";
    private const string JWT_SECRET = "jwtSecretKey456";
    
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
    public object Deserialize(byte[] data)
    {
        using (System.IO.MemoryStream ms = new System.IO.MemoryStream(data))
        {
            System.Runtime.Serialization.Formatters.Binary.BinaryFormatter formatter = 
                new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            return formatter.Deserialize(ms);
        }
    }
    
    // XSS
    public void RenderContent(string content)
    {
        System.Web.HttpContext.Current.Response.Write(content);
    }
}

