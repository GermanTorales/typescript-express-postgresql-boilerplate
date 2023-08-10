import envVars from './environment-variables.config';

const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-typescript-boilerplate API documentation',
    version: '0.0.1',
    description: 'This is a node express boilerplate in typescript',
    license: {
      name: 'MIT',
      url: ''
    }
  },
  servers: [
    {
      url: `http://localhost:${envVars.port}/v1`,
      description: 'Development Server'
    }
  ]
};

export default swaggerConfig;
