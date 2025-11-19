"""
Additional vulnerable Python code samples for SAST testing
Author: Test Suite
Created: 2025-01-21
"""

import hashlib
import pickle

# Hardcoded API keys
API_KEYS = {
    'stripe': 'sk_live_51H3ll0W0rld123456789',
    'aws': 'AKIAIOSFODNN7EXAMPLE',
    'github': 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
}

# Weak crypto - MD5
def hash_user_data(data):
    return hashlib.md5(data.encode()).hexdigest()

# Insecure deserialization
def load_user_data(data):
    return pickle.loads(data)

# Code Injection
def process_template(template):
    return eval(template)

