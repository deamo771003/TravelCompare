FROM node:16
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

ENV DEBIAN_FRONTEND noninteractive

# Make sure your init-app.sh script is executable
RUN chmod +x ./init-app.sh

# This will run your init-app.sh script when the container starts
ENTRYPOINT ["./init-app.sh"]

# Expose the port your app runs on
EXPOSE 3000

# Keep your CMD instruction to run the application
CMD [ "node", "app.js" ]
