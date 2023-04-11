import Player from '../lib/Player';

export default class Emote {
    private readonly _emoteID: string;
    private _time: number;
    private _playerID: string;

    constructor(emoteID: string, time: number, playerID: string) {
        this._emoteID = emoteID;
        this._time = time;
        this._playerID = playerID;
    }

    get emoteID(): string {
        return this._emoteID;
    }

    get time(): number {
        return this._time;
    }

    set time(time: number) {
        this._time = time;
    }

    get playerID(): string {
        return this._playerID;
    }

}
