FROM node:20.10.0

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . ./

# Expose the port on which the socket server will run (if applicable)
EXPOSE 8000

CMD ["node", "index.js"]
