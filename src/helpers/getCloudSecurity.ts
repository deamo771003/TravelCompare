import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();
const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID

export async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: `projects/${GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`,
  });

  // 確保 payload 和 data 不為 null
  if (!version.payload?.data) {
    throw new Error('No payload data returned from secret manager.');
  }

  return (version.payload.data as Buffer).toString('utf8');
}
