FROM node:20
USER root
WORKDIR /usr/src/app

# Copy package files and install dependencies

# RUN npm config set cache /tmp/npm-cache --global
COPY package*.json ./
# RUN npm install express
# RUN npm install express-session
# RUN npm install jest
# RUN npm install prettier
# RUN npm install prettier-eslint
# RUN npm install sqlite3
# RUN npm install bcrypt
# RUN npm install connect-flash
# RUN npm install cors
# RUN npm install core-js
# RUN npm install dotenv
# RUN npm install faker
# RUN npm install jsonwebtoken
# RUN npm install --production
RUN npm install -g npm@latest
RUN npm ci

# Install jq, aws-cli, and other dependencies
RUN apt-get update
RUN apt-get install -y curl gnupg2 jq less groff
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* awscliv2.zip

# Make sure to add /opt/mssql-tools/bin to PATH for sqlcmd
ENV PATH="$PATH:/opt/mssql-tools/bin"

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 80

# Keep your CMD instruction to run the application
CMD [ "node", "dist/app.js" ]

