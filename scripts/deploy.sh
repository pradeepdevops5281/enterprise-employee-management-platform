#!/bin/bash

# ==========================================
# Employee Management Platform
# Complete Deployment Automation Script
# ==========================================


# Project Configuration

PROJECT_NAME="Employee Management Platform"
ENVIRONMENT="Development"
COMPOSE_FILE="docker-compose.yml"

LOG_DIR="logs"
LOG_FILE="$LOG_DIR/deploy_$(date +%Y-%m-%d_%H-%M-%S).log"


# Create Log Directory

mkdir -p "$LOG_DIR"


# Enable Logging

exec > >(tee -a "$LOG_FILE") 2>&1


# Error Handling

set -e

trap 'echo "================================="; echo "DEPLOYMENT FAILED"; echo "Check log: $LOG_FILE"; echo "================================="' ERR



echo "================================="
echo "$PROJECT_NAME"
echo "Environment: $ENVIRONMENT"
echo "Deployment Started"
echo "Log File: $LOG_FILE"
echo "================================="



# Step 1: Check Docker

echo "Checking Docker..."

if ! command -v docker &> /dev/null
then
    echo "Docker not installed"
    exit 1
fi

docker --version

echo "Docker available"



# Step 2: Check Docker Compose

echo "Checking Docker Compose..."

docker compose version

echo "Docker Compose available"



# Step 3: Pull Latest Code

echo "Pulling latest source code..."

git pull

echo "Code updated"



# Step 4: Stop Existing Containers

echo "Stopping existing containers..."

docker compose -f "$COMPOSE_FILE" down

echo "Old containers removed"



# Step 5: Build Application

echo "Building application images..."

docker compose -f "$COMPOSE_FILE" build

echo "Build completed"



# Step 6: Start Application

echo "Starting application containers..."

docker compose -f "$COMPOSE_FILE" up -d

echo "Application started"



# Step 7: Verify Containers

echo "Checking running containers..."

docker ps



# Step 8: Deployment Health Check

echo "Performing health check..."

sleep 10

RUNNING=$(docker compose -f "$COMPOSE_FILE" ps | grep "Up" | wc -l)


if [ "$RUNNING" -gt 0 ]
then
    echo "Application is running successfully"
else
    echo "Application health check failed"
    exit 1
fi



# Final Message

echo "================================="
echo "DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "Project: $PROJECT_NAME"
echo "Environment: $ENVIRONMENT"
echo "Log: $LOG_FILE"
echo "================================="
