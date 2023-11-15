# Stage 1: Build the React application
FROM node:14 AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:1.21

# Copy the built app from the previous stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
