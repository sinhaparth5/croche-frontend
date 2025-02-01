# Use a Node.js base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Astro project
RUN npm run build

# Use a lightweight web server to serve the built files
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Install Astro globally to use the `preview` command
RUN npm install -g astro

# Expose the port your app will run on
EXPOSE 3000

# Start the Astro preview server
CMD ["astro", "preview", "--host", "0.0.0.0", "--port", "3000"]
