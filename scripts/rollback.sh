#!/bin/bash

# ==========================================
# Employee Management Platform
# Rollback Script
# ==========================================

PROJECT_NAME="enterprise-employee-management-platform"

echo "=========================================="
echo " Rollback: $PROJECT_NAME"
echo "=========================================="

echo ""
echo "Stopping current containers..."

docker compose down

if [ $? -ne 0 ]; then
    echo "❌ Failed to stop containers"
    exit 1
fi

echo ""
echo "Starting previous deployment..."

docker compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Rollback failed"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Rollback Completed"
echo "=========================================="
