"""
Vulnerable Python code samples for SAST testing
Author: Test Suite
Created: 2025-01-21
"""

import os
import subprocess
import pickle
import hashlib
from flask import Flask, request, render_template_string

app = Flask(__name__)

# SQL Injection vulnerability
def get_user_data(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)

# SQL Injection with string formatting
def get_user_by_name(username):
    query = "SELECT * FROM users WHERE username = '%s'" % username
    return db.execute(query)

# Command Injection
def execute_command(command):
    os.system(command)

def execute_command_subprocess(cmd):
    subprocess.call(cmd, shell=True)

# Code Injection - eval
def process_data(data):
    return eval(data)

# Code Injection - exec
def execute_code(code):
    exec(code)

# Hardcoded secrets
API_KEY = "sk_live_51H3ll0W0rld123456789"
PASSWORD = "admin123"
SECRET_KEY = "mySecretKey123"
DATABASE_PASSWORD = "db_pass_123"

# Path Traversal
def read_file(filename):
    with open(f"/var/www/data/{filename}", "r") as f:
        return f.read()

# Insecure deserialization - pickle
def deserialize_data(data):
    return pickle.loads(data)

# Weak crypto - MD5
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# XSS vulnerability - template injection
@app.route('/')
def index():
    user_input = request.args.get('name', '')
    template = f"<h1>Hello {user_input}</h1>"
    return render_template_string(template)

# Unsafe random
import random
def generate_token():
    return str(random.randint(1000, 9999))

# SQL Injection with .format()
def search_users(search_term):
    query = "SELECT * FROM users WHERE name LIKE '{}'".format(search_term)
    return db.execute(query)

