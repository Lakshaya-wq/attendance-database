FROM node:16.11.1
USER root
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start" ]