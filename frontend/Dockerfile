FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
ARG FRONTEND_PORT=3000
ENV FRONTEND_PORT=${FRONTEND_PORT}

EXPOSE ${FRONTEND_PORT}
CMD ["npm", "run", "dev"]
