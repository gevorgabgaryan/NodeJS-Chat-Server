import express from 'express';
import config from '../config';
import logger from '../lib/logger';
import { promisifyMiddleware } from './middlewares/promisifyMiddleware';
import apiRoutes from './routes/apiRoutes';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import requestLoggerMiddleware from './middlewares/requestLoggerMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundError';

class API {
  static async init() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(promisifyMiddleware());
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 1000000,
      legacyHeaders: false,
    });
    app.use(helmet());
    app.use(limiter);
    app.use(compression());
    app.use(requestLoggerMiddleware);
    app.use('/api', apiRoutes);
    app.use(notFoundMiddleware);
    const port = config.port;
    app.listen(port, () => {
      logger.info(`Rest server started on port: ${port}`);
    });
  }
}

export default API;
