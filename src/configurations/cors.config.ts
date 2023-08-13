import cors from 'cors';
import envVars from './environment-variables.config';

const corsConfig = () => {
  return cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (envVars.corsOrigins.indexOf(origin) === -1) {
        let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return cb(new Error(msg), false);
      }
      return cb(null, true);
    }
  });
};

export default corsConfig;
