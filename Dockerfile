# FROM node:18-alpine AS base

# # INSTALL DEPENDENCIES FOR DEVELOPMENT (FOR NEST)
# FROM base AS deps
# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./
# RUN npm ci

# USER node

# # INSTALL DEPENDENCIES & BUILD FOR PRODUCTION
# FROM base AS build
# WORKDIR /usr/src/app

# COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node . .

# RUN npm run build

# ENV NODE_ENV production
# RUN npm ci --only=production && npm cache clean --force

# USER node

# # PRODUCTION IMAGE

# FROM base AS production
# WORKDIR /usr/src/app

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# CMD [ "node", "dist/main.js" ]

FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]