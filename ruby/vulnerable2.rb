# Additional vulnerable Ruby code samples for SAST testing
# Author: Test Suite
# Created: 2025-01-21

require 'net/http'

# SQL Injection
def search_users(search_term)
  query = "SELECT * FROM users WHERE name LIKE '%#{search_term}%'"
  ActiveRecord::Base.connection.execute(query)
end

# Hardcoded secrets
DB_CONFIG = {
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'mydb'
}

# Command Injection
def run_command(cmd)
  system(cmd)
end

# Path Traversal
def read_config_file(filename)
  File.read("/etc/config/#{filename}")
end

