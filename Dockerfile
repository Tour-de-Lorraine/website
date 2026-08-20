# Stage 1: Build the application
FROM node:24-alpine AS build

# Build arguments for environment variables
ARG PUBLIC_DIRECTUS_URL=https://next.tourdelorraine.ch
ARG PUBLIC_DIRECTUS_TOKEN

# Set as environment variables so Vite/SvelteKit can read them
ENV PUBLIC_DIRECTUS_URL=${PUBLIC_DIRECTUS_URL}
ENV PUBLIC_DIRECTUS_TOKEN=${PUBLIC_DIRECTUS_TOKEN}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine AS production

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
