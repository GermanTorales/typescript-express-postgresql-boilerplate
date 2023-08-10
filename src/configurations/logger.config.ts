import winston from 'winston';
import { format } from 'date-fns';

import envVars from './environment-variables.config';

interface LoggingInfo {
  level: string;
  message: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: envVars.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    envVars.env === 'local' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf((info: LoggingInfo) => `${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} | ${info.level} | ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

export default logger;
