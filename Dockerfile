# --- Stage 1: Build the React Application ---
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# We use 'ci' for faster, reliable builds, but 'install' works too
RUN npm ci

# Copy source code
COPY . .

# Build the application (Generates the /dist folder)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built artifacts from the 'builder' stage
# Note: Vite usually builds to 'dist'. If yours is different, adjust this.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]