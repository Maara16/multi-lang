# Secure Ruby code samples for SAST false positive testing
# These are SAFE implementations that should NOT be flagged
# Author: Test Suite
# Created: 2025-01-21

require 'digest/sha2'
require 'securerandom'
require 'net/http'

# ✅ SAFE: Parameterized SQL query (should NOT be flagged)
def get_user_data(user_id)
  query = "SELECT * FROM users WHERE id = ?"
  ActiveRecord::Base.connection.execute(query, [user_id]) # Parameterized query
end

# ✅ SAFE: Parameterized SQL with LIKE (should NOT be flagged)
def search_users(search_term)
  query = "SELECT * FROM users WHERE name LIKE ?"
  ActiveRecord::Base.connection.execute(query, ["%#{search_term}%"]) # Parameterized
end

# ✅ SAFE: Command execution with whitelist (should NOT be flagged)
def execute_command(command)
  allowed_commands = ['ls', 'pwd', 'date']
  if allowed_commands.include?(command)
    system(command)
  end
end

# ✅ SAFE: No eval - using safe alternatives (should NOT be flagged)
def process_data(data)
  JSON.parse(data) # Safe - only parses JSON
end

# ✅ SAFE: Secrets from environment variables (should NOT be flagged)
API_KEY = ENV['API_KEY']
PASSWORD = ENV['DB_PASSWORD']
SECRET = ENV['SECRET_KEY']
DB_PASSWORD = ENV['DATABASE_PASSWORD']

# ✅ SAFE: Path validation before file access (should NOT be flagged)
require 'pathname'
def read_file(filename)
  base_path = Pathname.new('/var/www/data')
  safe_path = base_path + File.basename(filename)
  
  unless safe_path.realpath.to_s.start_with?(base_path.realpath.to_s)
    raise SecurityError, 'Invalid path'
  end
  
  File.read(safe_path)
end

# ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
def hash_password(password)
  Digest::SHA256.hexdigest(password)
end

# ✅ SAFE: Secure random (should NOT be flagged)
def generate_token
  SecureRandom.hex(32)
end

# ✅ SAFE: XSS prevention with ERB escape (should NOT be flagged)
require 'erb'
def display_message(message)
  escaped = ERB::Util.html_escape(message)
  puts "<div>#{escaped}</div>"
end

# ✅ SAFE: Safe YAML loading (should NOT be flagged)
require 'yaml'
def load_data(data)
  YAML.safe_load(data) # Safe - uses safe_load instead of load
end

