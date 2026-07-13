#!/bin/bash

# Employee Management Platform Deployment Script

PROJECT_NAME="Employee Management Platform"
ENVIRONMENT="Development"
COMPOSE_FILE="docker-compose.yml"


echo "================================="
echo "$PROJECT_NAME"
echo "Environment: $ENVIRONMENT"
echo "Deployment Started"
echo "================================="


# Stop script if any command fails
set -e


echo "Checking Docker..."

docker --version

echo "Docker is available"


echo "Checking Docker Compose..."

docker compose version

echo "Docker Compose is available"


echo "Pulling latest code..."

git pull


echo "Building application images..."

docker compose -f $COMPOSE_FILE build


echo "Starting application containers..."

docker compose -f $COMPOSE_FILE up -d


echo "Checking container status..."

docker ps


echo "================================="
echo "Deployment Completed Successfully"
echo "Project: $PROJECT_NAME"
echo "Environment: $ENVIRONMENT"
echo "================================="
