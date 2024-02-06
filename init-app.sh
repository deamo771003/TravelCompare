#!/bin/sh

# 檢索秘密值，請替換 "MySecretName" 為您在 AWS Secrets Manager 中設定的秘密名稱
DB_CREDENTIALS=$(aws secretsmanager get-secret-value --secret-id travelCompareENV --query SecretString --output text)

# 環境變數賦值
DB_USERNAME=$(echo $DB_CREDENTIALS | jq -r .DB_USERNAME)
DB_PASSWORD=$(echo $DB_CREDENTIALS | jq -r .DB_PASSWORD)
DB_HOST=$(echo $DB_CREDENTIALS | jq -r .DB_HOST)

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
