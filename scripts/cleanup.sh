#!/bin/bash

# ==========================================
# Employee Management Platform
# Cleanup Script
# ==========================================

PROJECT_NAME="enterprise-employee-management-platform"

echo "=========================================="
echo " Cleanup: $PROJECT_NAME"
echo "=========================================="

echo ""
echo "Stopping Docker containers..."

docker compose down

if [ $? -ne 0 ]; then
    echo "❌ Cleanup failed"
    exit 1
fi

echo ""
echo "Removing unused Docker resources..."

docker system prune -f

echo ""
echo "=========================================="
echo "✅ Cleanup Completed"
echo "=========================================="
