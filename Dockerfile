FROM node:20

WORKDIR /usr/src/app

COPY package.*json ./
# RUN npm install -g npm@latest
RUN npm install --omit=dev

# Install jq, aws-cli, and other dependencies
# RUN apt-get update && apt-get install -y curl gnupg2 jq less groff
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# RUN unzip awscliv2.zip
# RUN ./aws/install
# RUN rm -rf awscliv2.zip
# Use the updated method for adding the Microsoft repository
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg
# RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
# Update the package list after adding new repository
# Install SQL Server command-line tools
# RUN apt-get update
# RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev
# Cleanup
# RUN apt-get clean
# RUN rm -rf /var/lib/apt/lists/*

# # # Make sure to add /opt/mssql-tools/bin to PATH for sqlcmd
# ENV PATH="$PATH:/opt/mssql-tools/bin"

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 80

# Keep your CMD instruction to run the application
CMD [ "node", "dist/app.js" ]
