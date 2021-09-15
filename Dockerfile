FROM node:16.8.0
USER root
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start" ]