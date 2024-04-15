FROM node:18

WORKDIR /src/app

COPY package.*json ./
RUN npm install -g npm@latest
RUN npm install --production

# Install jq, aws-cli, and other dependencies
RUN apt-get update && apt-get install -y curl gnupg2 jq less groff \
  # && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  # && unzip awscliv2.zip \
  # && ./aws/install \
  # && rm -rf awscliv2.zip \
  # Use the updated method for adding the Microsoft repository
  && curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg \
  && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
  # Update the package list after adding new repository
  && apt-get update \
  # Install SQL Server command-line tools
  && ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev \
  # Cleanup
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# # Make sure to add /opt/mssql-tools/bin to PATH for sqlcmd
ENV PATH="$PATH:/opt/mssql-tools/bin"

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 80

# Keep your CMD instruction to run the application
CMD [ "node", "dist/app.js" ]
