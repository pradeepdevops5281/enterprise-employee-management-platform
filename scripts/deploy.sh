#!/bin/bash

echo "================================="
echo "Employee Management Platform"
echo "Deployment Script Started"
echo "================================="

echo "Checking Docker..."

if docker --version
then
    echo "Docker is installed"
else
    echo "Docker is not installed"
    exit 1
fi


echo "Checking Docker Compose..."

if docker compose version
then
    echo "Docker Compose available"
else
    echo "Docker Compose not available"
    exit 1
fi


echo "Pulling latest code..."

git pull


echo "Building application images..."

docker compose build


echo "Starting application containers..."

docker compose up -d


echo "Checking running containers..."

docker ps


echo "================================="
echo "Deployment Completed Successfully"
echo "================================="
