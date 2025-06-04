# Docker Setup Guide

This document explains how to set up and run the application in a Docker environment.

## Prerequisites

- Docker installed on your machine
- Node.js project source code

## Building and Running Docker Image

### 1. Build Docker Image

Run the following command in the project root directory to build the Docker image:

**docker build -t nextjs-app .**

### 2. Run Docker Container

Start a container from the built image:

**docker run -p 3000:3000 nextjs-app**

The application will be accessible at http://localhost:3000

## Additional Docker Commands

### Run in Background
To run the container in detached mode:

**docker run -d -p 3000:3000 nextjs-app**

