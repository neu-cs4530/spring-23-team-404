import { createClient } from 'redis';

/**
 * Redis client class for establishing connection with emote database.
 */
export default class RedisClient {
  // Temporary redis passwords and usernames
  private _password = 'r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg';

  private _host = 'redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com';

  private _port = 14638;

  // Amount of emotes wanted
  private _numEmotes = 8;

  private _client = createClient({
    socket: {
      host: this._host,
      port: this._port,
    },
    password: this._password,
  });

  private async _connect() {
    await this._client.connect();
  }

  private async _getEmotes() {
    const emoteKeys: string[] = [];
    for (let i = 1; i < this._numEmotes + 1; ++i) {
      const emoteKey: string = 'emote'.concat(i as unknown as string);
      emoteKeys.push(emoteKey);
    }
    const promises = emoteKeys.map(async emoteKey => this._client.get(emoteKey));
    return Promise.all(promises);
  }

  public async start(): Promise<(string | null)[]> {
    this._connect();
    return this._getEmotes();
  }
}
