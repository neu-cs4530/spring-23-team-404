import { Client, Entity, Schema, Repository } from 'redis-om';

const fs = require('fs');

const PASSWORD : string = "r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg";
const HOST : string = "redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com";
const PORT : string = "14638";

const REDIS_URL : string = "redis://default:" + PASSWORD + "@" + HOST + ":" + PORT;

const client: Client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(REDIS_URL);
        console.log('Connected');
    }
 }



 async function getEmotes() {
    const emotes : string[] = [];
    const emoteNames = new Array(10);
    emoteNames.forEach(async (emoteName) => {
    const emote : string | null = await client.get('emote' + emoteName as string);
    if (emote === null) {
        console.error("Could not get emote" + emoteName as string);
    }
    else emotes.push(emote as string);
    })
    return emotes;
 }

connect();
const emotes : string[] = await getEmotes()
