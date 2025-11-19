"""
Secure Python code samples for SAST false positive testing
These are SAFE implementations that should NOT be flagged
Author: Test Suite
Created: 2025-01-21
"""

import os
import subprocess
import hashlib
import secrets
from flask import Flask, request, escape
import psycopg2
from psycopg2 import sql

app = Flask(__name__)

# ✅ SAFE: Parameterized SQL query (should NOT be flagged)
def get_user_data(user_id):
    query = "SELECT * FROM users WHERE id = %s"
    return db.execute(query, (user_id,))  # Parameterized query

# ✅ SAFE: SQL with psycopg2 parameterized queries (should NOT be flagged)
def search_users(search_term):
    query = sql.SQL("SELECT * FROM users WHERE name LIKE %s")
    return db.execute(query, (f'%{search_term}%',))

# ✅ SAFE: Command execution with validation (should NOT be flagged)
def execute_command(command):
    allowed_commands = ['ls', 'pwd', 'date']
    if command in allowed_commands:
        subprocess.run([command], check=True)  # Safe - no shell=True

# ✅ SAFE: No eval/exec - using safe alternatives (should NOT be flagged)
def process_data(data):
    import json
    return json.loads(data)  # Safe - only parses JSON

# ✅ SAFE: Secrets from environment variables (should NOT be flagged)
API_KEY = os.getenv('API_KEY')
PASSWORD = os.getenv('DB_PASSWORD')
SECRET_KEY = os.getenv('SECRET_KEY')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

# ✅ SAFE: Path validation before file access (should NOT be flagged)
import os.path
def read_file(filename):
    safe_path = os.path.join('/var/www/data', os.path.basename(filename))
    if not safe_path.startswith('/var/www/data'):
        raise ValueError('Invalid path')
    with open(safe_path, "r") as f:
        return f.read()

# ✅ SAFE: Strong crypto - bcrypt (should NOT be flagged)
import bcrypt
def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt)

# ✅ SAFE: Secure random (should NOT be flagged)
def generate_token():
    return secrets.token_urlsafe(32)

# ✅ SAFE: XSS prevention with escape (should NOT be flagged)
@app.route('/')
def index():
    user_input = request.args.get('name', '')
    escaped_input = escape(user_input)  # Safe - HTML escaped
    return f"<h1>Hello {escaped_input}</h1>"

# ✅ SAFE: Safe string formatting for SQL (should NOT be flagged)
def get_user_by_id(user_id):
    # Using parameterized query, not string formatting
    query = "SELECT * FROM users WHERE id = %s"
    return db.execute(query, (user_id,))

