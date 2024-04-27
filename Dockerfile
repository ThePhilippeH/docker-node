FROM node:15 
# Create app directory
WORKDIR /app 
# Install app dependencies
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
    else npm install; \
    fi
# Bundle app source
COPY . ./
ENV PORT 3000 
#Only changes all the source code
EXPOSE $PORT
#Here we actually run the container
CMD [ "node","index.js" ]
