# Use the standard nodejs image as a base
FROM node:0.10-onbuild

# Install production dependencies.
ADD package.json /app/package.json
RUN cd /app && npm install --production

# Add the rest of the project to a folder app in the container.
ADD ./app /app
ADD ./config /app/config
ADD ./deploy.sh /deploy.sh

# Set working directory for the app:
WORKDIR /app

# Expose the correct port for your app. This will be picked up by "Katalog" who
# will make sure Nginx redirects to this port.
EXPOSE 9000

CMD NODE_ENV=production node /app/server.js
