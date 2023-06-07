FROM node:16

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm start
RUN npm db:migrate && npm run db:seed
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .