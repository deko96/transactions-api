import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AuditSubscriber } from 'src/audit/subscribers/audit.subscriber';
import entities from './entities';
import migrations from './migrations';

export const getOrmOptions = async (): Promise<DataSourceOptions> => {
  const sm = new SecretsManager({
    region: process.env.AWS_REGION || 'us-east-1',
  });

  const secret = await sm.getSecretValue({
    SecretId: process.env.RDS_SECRET_ARN,
  });
  const parsedSecret = JSON.parse(secret.SecretString);

  return {
    type: 'mysql',
    subscribers: [AuditSubscriber],
    entities,
    migrations,
    host: process.env.RDS_HOST,
    database: process.env.RDS_DB_NAME,
    ...parsedSecret,
  };
};

export const getDataSource = async (): Promise<DataSource> => {
  const options = await getOrmOptions();
  return new DataSource(options);
};

export default getDataSource();
