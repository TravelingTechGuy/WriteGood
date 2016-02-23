FROM risingstack/alpine:3.3-v5.6.0-3.0.1

COPY package.json package.json
RUN npm install

# Add your source files
COPY src src
COPY dist dist
COPY server.js server.js
CMD ["npm","start"]
