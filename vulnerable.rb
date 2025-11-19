# Vulnerable Ruby code samples for SAST testing
# Author: Test Suite
# Created: 2025-01-21

require 'digest/md5'
require 'net/http'
require 'open3'

# SQL Injection vulnerability
def get_user_data(user_id)
  query = "SELECT * FROM users WHERE id = #{user_id}"
  ActiveRecord::Base.connection.execute(query)
end

# SQL Injection with string interpolation
def search_users(search_term)
  query = "SELECT * FROM users WHERE name LIKE '#{search_term}'"
  ActiveRecord::Base.connection.execute(query)
end

# Command Injection
def execute_command(command)
  system(command)
end

def execute_command_backticks(cmd)
  `#{cmd}`
end

# Code Injection - eval
def process_data(data)
  eval(data)
end

# Hardcoded secrets
API_KEY = "sk_live_51H3ll0W0rld123456789"
PASSWORD = "admin123"
SECRET = "mySecretKey123"
DB_PASSWORD = "db_pass_123"

# Path Traversal
def read_file(filename)
  File.read("/var/www/data/#{filename}")
end

# Weak crypto - MD5
def hash_password(password)
  Digest::MD5.hexdigest(password)
end

# XSS vulnerability
def display_message(message)
  puts "<div>#{message}</div>"
end

# Insecure deserialization - YAML
def deserialize_data(data)
  YAML.load(data)
end

# Command Injection with Open3
def run_command(cmd)
  Open3.popen3(cmd) do |stdin, stdout, stderr, wait_thr|
    stdout.read
  end
end

