import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  JWTSecret: process.env.JWT_SECRET || '',
  JWTExpireIn: process.env.JWT_EXPIRE_IN,
  mongoDB: {
    url: process.env.MONGO_DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'CHAT',
  },
  defaultRoomId: '',
  wsPort: process.env.WS_PORT ? parseInt(process.env.WS_PORT, 10) : 1990,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:8389',
};

export default config;
