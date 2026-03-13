# Alpine lacks a GNU loader required by Next.js's native SWC binaries.
# switch to a Debian-based image so turbopack / swc work correctly.
FROM node:24-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# note: when using a Debian image the container will be larger, but
# it avoids the "ld-linux-x86-64.so.2" error and turbopack/wasm issues.

CMD [ "npm", "run", "dev" ]