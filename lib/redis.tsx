import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Emote extends Entity {}
let schema = new Schema(
    Emote,
    {
        emoteID: { type: 'number'},
        body: { type: 'string'},
    }
    {
        dataStructure: 'JSON',
    }
);