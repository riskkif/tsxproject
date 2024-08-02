#!/bin/bash


# Build the Docker image
docker build -t admin:1.0 .

# Remove any existing container named 
docker rm -f admin || true

# Run the Docker container with specified options
docker run --name=admin --hostname=admin --volume=/root/admin:/admin --workdir=/admin -p 5137:5137 --restart=no --runtime=runc admin:1.0 npm run dev --host=0.0.0.0 --reload