import { createClient } from 'redis';
import * as fs from 'fs';

export default class RedisClient {


private PASSWORD : string = "r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg";
private HOST : string = "redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com";
private PORT : number = 14638;

private REDIS_URL : string = "redis://default:" + this.PASSWORD + "@" + this.HOST + ":" + this.PORT;

private client = createClient({
    socket: {
        host: this.HOST,
        port: this.PORT
    },
    password: this.PASSWORD,
});

    constructor() {

    }



private async connect() {
    await this.client.connect();
    // if (!this.client.isOpen()) {
    //     await this.client.open(this.REDIS_URL);
    //     console.log('Connected');
    // }
 }



 private async getEmotes() {
    const emotes : string[] = [];
    const emoteNames = new Array(10);
    emoteNames.forEach(async (emoteName) => {
    const emote : string | null = await this.client.get('emote' + emoteName as string);
    if (emote === null) {
        console.error("Could not get emote" + emoteName as string);
    }
    else emotes.push('data:image/png;base64,' + emote as string);
    })
    return Promise.resolve(emotes);
 }

public async start(): Promise<string[]> {
this.connect();
return await this.getEmotes()
// emotes.forEach((emote) => {
//     var image = new Image();
//     image.src = 'data:image/png;base64,';
// })
 }


}