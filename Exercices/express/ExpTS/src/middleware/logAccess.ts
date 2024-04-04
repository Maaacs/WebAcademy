import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logAccess = (req: Request, res: Response, next: NextFunction) => {
  const logFormat = process.env.LOG_FORMAT || 'simples';
  const logDir = process.env.LOGS_DIR || './logs';
  const logFile = path.join(logDir, 'access.log');

  let logMessage = `${new Date().toISOString()}, ${req.url}, ${req.method}`;
  if (logFormat === 'completo') {
    logMessage += `, ${req.httpVersion}, ${req.get('User-Agent')}`;
  }

  fs.appendFile(logFile, logMessage + '\n', err => {
    if (err) {
      console.error('Erro ao escrever no arquivo de log', err);
    }
  });

  next();
};

export default logAccess;
