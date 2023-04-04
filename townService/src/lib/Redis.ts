import { Client, Entity, Schema, Repository } from 'redis-om';
import { createClient } from 'redis';

const client = createClient({
  password: 'r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg',
  socket: {
    host: 'redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14638,
  },
});

class Emote extends Entity {}
const schema = new Schema(
  Emote,
  {
    emoteID: { type: 'number' },
    body: { type: 'string' },
  },
  {
    dataStructure: 'JSON',
  },
);
