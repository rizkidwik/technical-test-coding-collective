# Use the official Node.js image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application files
COPY . .

RUN npm run build

# Expose the port your app will run on
EXPOSE 3001

# Command to run the backend
CMD ["npm", "start"]
