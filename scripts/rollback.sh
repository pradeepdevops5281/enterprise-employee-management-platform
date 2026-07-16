#!/bin/bash

# ==========================================
# Employee Management Platform
# Rollback Script
# ==========================================

PROJECT_NAME="enterprise-employee-management-platform"

ROLLBACK_TAG="$1"

if [ -z "$ROLLBACK_TAG" ]; then
    echo "❌ Rollback tag is required"
    echo "Usage: ./scripts/rollback.sh <commit-tag>"
    exit 1
fi

echo "=========================================="
echo " Rollback: $PROJECT_NAME"
echo "=========================================="

echo ""
echo "Rolling back to image tag: $ROLLBACK_TAG"

echo ""
echo "Pulling rollback images..."

IMAGE_TAG="$ROLLBACK_TAG" docker compose pull

if [ $? -ne 0 ]; then
    echo "❌ Failed to pull rollback images"
    exit 1
fi

echo ""
echo "Stopping current containers..."

docker compose down

if [ $? -ne 0 ]; then
    echo "❌ Failed to stop containers"
    exit 1
fi

echo ""
echo "Starting rollback deployment..."

IMAGE_TAG="$ROLLBACK_TAG" docker compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Rollback failed"
    exit 1
fi

echo ""
echo "Running health check..."

sleep 10

./scripts/health-check.sh

if [ $? -ne 0 ]; then
    echo "❌ Rollback health check failed"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Rollback Completed"
echo "Tag: $ROLLBACK_TAG"
echo "=========================================="
