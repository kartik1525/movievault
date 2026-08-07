FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Bind to port 5000 (adjust if your backend uses a different port)
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
