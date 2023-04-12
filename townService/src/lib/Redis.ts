import { createClient } from 'redis';
import * as fs from 'fs';
import { privateEncrypt } from 'crypto';

export default class RedisClient {
  private PASSWORD: string = 'r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg';
  private HOST: string = 'redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com';
  private PORT: number = 14638;

  private REDIS_URL: string =
    'redis://default:' + this.PASSWORD + '@' + this.HOST + ':' + this.PORT;

  private client = createClient({
    socket: {
      host: this.HOST,
      port: this.PORT,
    },
    password: this.PASSWORD,
  });

  constructor() {}

  private async connect() {
    await this.client.connect();
  }

  private async getEmotes() {
    const emotes: string[] = [];
    for (let i = 1; i < 9; ++i) {
      const emote: string | null = await this.client.get(('emote' + i) as string);
      if (emote === null) {
        console.error(('Could not get emote' + i) as string);
      } else emotes.push(emote);
    }
    return emotes;
  }

  public async start(): Promise<string[]> {
    this.connect();
    return this.getEmotes();
    // emotes.forEach((emote) => {
    //     var image = new Image();
    //     image.src = 'data:image/png;base64,';
    // })
  }
}
