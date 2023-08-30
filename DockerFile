# Use the official Node.js image with the specified version
FROM node:18.16.0

# Set the working directory to the root directory
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies with NPM_CONFIG_PRODUCTION=false
RUN  npm install

# Copy the frontend directory to the working directory
COPY frontend ./frontend

# Install frontend dependencies and build the frontend
RUN npm install --prefix frontend
RUN npm run build --prefix frontend

# Set environment variables
ENV PORT=8000
ENV MONGO_URI=mongodb+srv://jenkinsmaster:CqieshepwNbEOSbG@mycluster.cntckcz.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=minininininininininii
ENV CLOUDINARY_CLOUD_NAME=buymybook
ENV CLOUDINARY_API_KEY=316133335924822
ENV CLOUDINARY_API_SECRET=A0gMZw6RTxOxgnGTzlxXa0avDaU

# Expose port 8000
EXPOSE 8000

# Command to start your Node.js server
CMD ["npm", "run", "dev"]
