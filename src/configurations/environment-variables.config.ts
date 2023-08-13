import 'dotenv/config';
import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'local', 'test').required(),
    PORT: Joi.number().default(3000),
    HOST: Joi.string().default('localhost'),
    CORS_ORIGINS: Joi.string(),
    /* Database */
    DB_TYPE: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_USERNAME: Joi.string().required(),
    POSTGRES_DATABASE: Joi.string().required(),
    POSTGRES_SYNCHRONIZE: Joi.string().required(),
    POSTGRES_LOGGING: Joi.string().required(),
    /* Bcrypt */
    HASH_ROUNDS: Joi.string().required()
  })
  .unknown();

const { value: envVarsValues, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

interface IPostgres {
  host: string;
  port: number;
  password: string;
  username: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

interface IJwt {
  secret: string;
  expireIn: number;
}

interface IEnvVars {
  env: string;
  port: number;
  host: string;
  postgres: IPostgres;
  hashRounds: number;
  jwt: IJwt;
  corsOrigins: string[];
}

const envVars: IEnvVars = {
  env: envVarsValues.NODE_ENV,
  port: parseInt(envVarsValues.PORT, 10),
  host: envVarsValues.HOST,
  postgres: {
    host: envVarsValues.POSTGRES_HOST,
    port: parseInt(envVarsValues.POSTGRES_PORT, 10),
    password: envVarsValues.POSTGRES_PASSWORD,
    username: envVarsValues.POSTGRES_USERNAME,
    database: envVarsValues.POSTGRES_DATABASE,
    synchronize: Boolean(envVarsValues.POSTGRES_SYNCHRONIZE),
    logging: Boolean(envVarsValues.POSTGRES_LOGGING)
  },
  hashRounds: parseInt(envVarsValues.HASH_ROUNDS, 10),
  jwt: {
    secret: envVarsValues.JWT_SECRET,
    expireIn: parseInt(envVarsValues.JWT_EXPIRATION_TIME, 10)
  },
  corsOrigins: envVarsValues.CORS_ORIGINS.split(',')
};

export default envVars;
