#!/bin/bash


# Build the Docker image
docker build -t admintsxproject:1.0 .

# Remove any existing container named 
docker rm  admintsxproject || true

# Run the Docker container with specified options
docker run --name=admintsxproject --hostname=admintsxproject --volume=/root/admintsxproject:/admintsxproject --workdir=/admintsxproject -p 5137:5137 --restart=no --runtime=runc admintsxproject:1.0 npm run dev --host=0.0.0.0 --reload