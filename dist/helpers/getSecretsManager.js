"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
// 創建 Secrets Manager 客戶端實例
const client = new client_secrets_manager_1.SecretsManagerClient({ region: "ap-northeast-1" });
// 定義函數以從 Secrets Manager 獲取秘密
function getSecret(secretName) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretName });
        try {
            const response = yield client.send(command);
            if (response.SecretString) {
                // 秘密以字符串形式存儲
                const secret = response.SecretString;
                const secretObject = JSON.parse(secret);
                return secretObject;
            }
            else if (response.SecretBinary) {
                // 秘密以二進制形式存儲，將其轉換為字符串
                const secretBinary = response.SecretBinary;
                const secretString = Buffer.from(secretBinary).toString('ascii');
                const secretObject = JSON.parse(secretString);
                return secretObject;
            }
        }
        catch (err) {
            console.error("Unable to retrieve secret:", err);
            return undefined;
        }
    });
}
exports.getSecret = getSecret;
