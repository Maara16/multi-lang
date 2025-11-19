# Additional vulnerable Ruby code samples for SAST testing
# Author: Test Suite
# Created: 2025-01-21

require 'digest/md5'
require 'yaml'

# Hardcoded API keys
API_KEYS = {
  stripe: 'sk_live_51H3ll0W0rld123456789',
  aws: 'AKIAIOSFODNN7EXAMPLE',
  github: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
}

# Weak crypto - MD5
def hash_password(password)
  Digest::MD5.hexdigest(password)
end

# Insecure deserialization
def load_data(data)
  YAML.load(data)
end

# Code Injection
def process_template(template)
  eval(template)
end

