import Redis from 'ioredis';
import config from '../../config';

export class RedisPubSub {
  private static instance: RedisPubSub | null = null;
  private redis: Redis;
  private redisSub: Redis;

  private constructor() {
    this.redis = new Redis(config.redisUrl);
    this.redisSub = new Redis(config.redisUrl);

    this.redisSub.on('message', (channel: string, message: string) => {
      this.onMessageReceived(channel, message);
    });
  }

  public static getInstance(): RedisPubSub {
    if (RedisPubSub.instance === null) {
      RedisPubSub.instance = new RedisPubSub();
    }
    return RedisPubSub.instance;
  }

  public subscribe(
    channel: string,
    handler: (channel: string, message: string) => void,
  ): void {
    this.redisSub.subscribe(channel);
    this.onMessageReceived = handler;
  }

  public publish(channel: string, message: string): void {
    this.redis.publish(channel, message);
  }

  public onMessageReceived = (channel: string, message: string): void => {

  };

  public close(): void {
    this.redis.quit();
    this.redisSub.quit();
  }
}
