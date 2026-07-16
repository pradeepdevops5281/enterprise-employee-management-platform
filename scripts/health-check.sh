#!/bin/bash

# ==========================================
# Employee Management Platform
# Health Check Script
# ==========================================

PROJECT_NAME="enterprise-employee-management-platform"

echo "=========================================="
echo " Health Check: $PROJECT_NAME"
echo "=========================================="

echo ""
echo "Checking Docker containers..."

if docker compose ps | grep -q "Up"; then
    echo "✅ Docker containers are running"
else
    echo "❌ Docker containers are not running"
    exit 1
fi

echo ""
echo "Checking frontend..."

if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Health Check Passed"
echo "=========================================="
