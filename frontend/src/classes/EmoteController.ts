import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';

export type Emote = {
  playerID: string,
  time: number,
  emoteID: string,
}

export type EmoteEvents = {
  emotesChange: (newEmotes: Emote[]) => void;
};

export default class EmoteController extends (EventEmitter as new () => TypedEmitter<PlayerEvents>) {
    
}