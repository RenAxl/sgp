FROM node:14.21.3-bullseye-slim

WORKDIR /app

# Node 14 includes npm 6.14.18, compatible with this project's lockfile.
RUN node --version && npm --version && chown node:node /app

USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

COPY --chown=node:node . .

ENV HOST=0.0.0.0 \
    PORT=3000 \
    BROWSER=none

EXPOSE 3000

CMD ["npm", "start"]
