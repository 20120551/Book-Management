# like tsc -p . for build dist folder
FROM node as builder
WORKDIR /app
COPY *.json .
RUN npm install
COPY . .
RUN npm run build

# run node
FROM node:slim
ENV NODE_ENV production
WORKDIR /app
COPY *.json .
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 5001
CMD ["node", "dist/index.js"]