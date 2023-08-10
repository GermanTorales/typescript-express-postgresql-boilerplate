import 'dotenv/config';
import Joi from 'joi';

console.log('object');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'local', 'test').required(),
    PORT: Joi.number().default(3000),
    HOST: Joi.string().default('localhost')
  })
  .unknown();

const { value: envVarsValues, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = {
  env: envVarsValues.NODE_ENV,
  port: parseInt(envVarsValues.PORT, 10),
  host: envVarsValues.HOST
};

export default envVars;
