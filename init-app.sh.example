#!/bin/sh

# 檢索秘密值，請替換 "MySecretName" 為您在 AWS Secrets Manager 中設定的秘密名稱
DB_CREDENTIALS=$(aws secretsmanager get-secret-value --secret-id travelCompareENV --query SecretString --output text)

# 環境變數賦值
DB_USERNAME=$(echo $DB_CREDENTIALS | jq -r .DB_USERNAME)
DB_PASSWORD=$(echo $DB_CREDENTIALS | jq -r .DB_PASSWORD)
DB_HOST=$(echo $DB_CREDENTIALS | jq -r .DB_HOST)

# 進行資料庫連接檢查  
while ! sqlcmd -S $DB_HOST -U $DB_USERNAME -P$DB_PASSWORD -Q "SELECT 1" ; do
  echo "Waiting for database connection..."
  sleep 2
done

# 檢查Users表是否存在，並修剪輸出
table_exists=$(sqlcmd -S "$DB_HOST" -d "$DB_DATABASE" -U "$DB_USERNAME" -P "$DB_PASSWORD" -Q "SET NOCOUNT ON; IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'Users') BEGIN PRINT '1'; END ELSE BEGIN PRINT '0'; END" -h -1 | tr -d '[:space:]')

# 如果表不存在，執行遷移和種子
if [ "$table_exists" = "0" ]; then
    echo "Table 'Users' does not exist, running migrations and seeds."
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
else
    echo "Table 'Users' exists."
fi

# 啟動app
npm start
