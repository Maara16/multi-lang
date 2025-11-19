"""
Additional vulnerable Python code samples for SAST testing
Author: Test Suite
Created: 2025-01-21
"""

import os
import subprocess

# SQL Injection with .format()
def get_user_by_email(email):
    query = "SELECT * FROM users WHERE email = '{}'".format(email)
    return db.execute(query)

# Hardcoded secrets
DATABASE_CONFIG = {
    'host': 'localhost',
    'user': 'admin',
    'password': 'admin123',
    'database': 'mydb'
}

# Command Injection
def run_system_command(cmd):
    os.system(cmd)

# Path Traversal
def read_config_file(filename):
    with open(f"/etc/config/{filename}", "r") as f:
        return f.read()

