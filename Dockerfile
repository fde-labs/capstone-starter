# Cloud Run sends requests to the port in $PORT and the process must listen on
# 0.0.0.0. Bound to localhost it runs fine on your laptop and the deploy fails.
FROM node:24-slim
WORKDIR /app
COPY package.json ./
COPY server.js ./
COPY public ./public
ENV PORT=8080
EXPOSE 8080
USER node
CMD ["node", "server.js"]
