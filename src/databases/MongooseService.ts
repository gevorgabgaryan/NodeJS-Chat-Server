import mongoose from 'mongoose';
import config from '../config';
import logger from '../lib/logger';

class MongooseService {
  static async init() {
    const url = config.mongoDB.url;
    const db = mongoose.connection;

    db.on('connected', () => {
      logger.info('connected to MongoDB');
    });
    db.on('error', (e: any) => {
      logger.error('MongoDB connect error');
      logger.error(e);
      process.exit(1);
    });

    try {
      await mongoose.connect(`${url}/${config.mongoDB.dbName}`);
    } catch (e) {
      logger.error('Mongo connection error');
      logger.error(e);
    }
  }
}

export default MongooseService;
