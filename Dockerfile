FROM node:18

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm config set registry https://registry.npmjs.org
RUN npm config set cache /tmp/npm-cache --global
RUN npm install

# Install jq, aws-cli, and other dependencies
RUN apt-get update && \
  apt-get install -y curl gnupg2 jq less groff && \
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install && \
  curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
  curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
  apt-get update && \
  ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* awscliv2.zip

# Make sure to add /opt/mssql-tools/bin to PATH for sqlcmd
ENV PATH="$PATH:/opt/mssql-tools/bin"

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 80

# Keep your CMD instruction to run the application
CMD [ "node", "dist/app.js" ]
