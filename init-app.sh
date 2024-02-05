#!/bin/sh

# 導入 Microsoft 的 GPG 密鑰
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# 添加 SQL Server 的 Debian 存儲庫
curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

# 更新存儲庫索引並安裝 SQL Server 命令行工具
apt-get update
ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

# 將 SQL Server 工具添加到 PATH
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
. ~/.bashrc

# 進行資料庫連接檢查
while ! /opt/mssql-tools/bin/sqlcmd -S "host.docker.internal" -U sa -P password -Q "SELECT 1" ; do
  echo "Waiting for database connection..."
  sleep 2
done

# 檢查Users表是否存在
table_exists=$(/opt/mssql-tools/bin/sqlcmd -S "host.docker.internal" -U sa -P password -d travel_compare -Q "IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users') SELECT 1 ELSE SELECT 0" -h -1)

# 如果表不存在，執行遷移和種子
if [ "$table_exists" -eq "0" ]; then
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
else
  echo 'Database is not empty, skipping seeds'
fi

# 啟動app
npm start
