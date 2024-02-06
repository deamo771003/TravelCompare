#!/bin/sh

# 檢查並安裝 jq 如果尚未安裝，輕量級且靈活的命令行 JSON 處理器，解析複雜的 JSON 數據
if ! command -v jq &> /dev/null; then
    echo "jq could not be found, installing..."
    sudo dnf install -y jq
else
    echo "jq is already installed."
fi

# 檢索秘密值，請替換 "MySecretName" 為您在 AWS Secrets Manager 中設定的秘密名稱
DB_CREDENTIALS=$(aws secretsmanager get-secret-value --secret-id travelCompareENV --query SecretString --output text)

# 環境變數賦值
DB_USERNAME=$(echo $DB_CREDENTIALS | jq -r .DB_USERNAME)
DB_PASSWORD=$(echo $DB_CREDENTIALS | jq -r .DB_PASSWORD)
DB_HOST=$(echo $DB_CREDENTIALS | jq -r .DB_HOST)

# 導入 Microsoft 的 GPG 密鑰
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/pki/rpm-gpg/Microsoft.asc

# 添加 SQL Server 的存儲庫
sudo curl https://packages.microsoft.com/config/rhel/8/prod.repo -o /etc/yum.repos.d/mssql-release.repo

# 接受 EULA 協議並安裝 SQL Server 命令行工具
sudo dnf check-update
ACCEPT_EULA=Y sudo dnf install -y mssql-tools unixODBC-devel

# 將 SQL Server 工具添加到 PATH 以便之後使用
export PATH="$PATH:/opt/mssql-tools/bin"

# 進行資料庫連接檢查
while ! /opt/mssql-tools/bin/sqlcmd -S $DB_HOST -U $DB_USERNAME -P $DB_PASSWORD -Q "SELECT 1" ; do
  echo "Waiting for database connection..."
  sleep 2
done

# 檢查Users表是否存在
table_exists=$(/opt/mssql-tools/bin/sqlcmd -S $DB_HOST -U $DB_USERNAME -P $DB_PASSWORD -d travelCompare -Q "IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users') SELECT 1 ELSE SELECT 0" -h -1)

# 如果表不存在，執行遷移和種子
if [ "$table_exists" -eq "0" ]; then
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
else
  echo 'Database is not empty, skipping seeds'
fi

# 啟動app
npm start
