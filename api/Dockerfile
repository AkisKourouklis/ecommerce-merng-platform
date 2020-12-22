FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]