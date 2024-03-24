import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config = {
  port: process.env.PORT,
  JWTSecret: process.env.JWT_SECRET || '',
  JWTExpireIn: process.env.JWT_EXPIRE_IN,
  mongoDB: {
    url: process.env.MONGO_DB_URL,
    dbName: process.env.MONGO_DB_NAME,
  },
  defaultRoomId: '',
  wsPort: process.env.WS_PORT ? parseInt(process.env.WS_PORT, 10) : 1990,
  redisUrl: `redis://localhost:${process.env.REDIS_PORT ?? 6379}`
};

export default config;
