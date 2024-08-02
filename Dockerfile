# Use the official Node.js 20-alpine image as the base image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that your Vite app runs on
EXPOSE 5137

# Command to run your app
CMD ["npm", "run", "dev"]
