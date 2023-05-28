FROM node:18-alpine
LABEL authors="keith"

WORKDIR /app
# Copy app files
COPY package.json .

# Build the app
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

# Start the app
CMD [ "npm", "run", "dev" ]
