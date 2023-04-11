import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { Player as PlayerModel, PlayerLocation, Emote } from '../types/CoveyTownSocket';

export type PlayerEvents = {
  movement: (newLocation: PlayerLocation) => void;
};

export type PlayerGameObjects = {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  emote: Phaser.GameObjects.Sprite | undefined;
  status: Phaser.GameObjects.Text | undefined;
  label: Phaser.GameObjects.Text;
  locationManagedByGameScene: boolean /* For the local player, the game scene will calculate the current location, and we should NOT apply updates when we receive events */;
};
export default class PlayerController extends (EventEmitter as new () => TypedEmitter<PlayerEvents>) {
  private _emotes?: string[];

  private _location: PlayerLocation;

  private _emote?: Emote;

  private _status?: string;

  private readonly _id: string;

  private readonly _userName: string;

  public gameObjects?: PlayerGameObjects;

  constructor(
    id: string,
    userName: string,
    location: PlayerLocation,
    emote: Emote | undefined,
    emotes: string[] | undefined,
    status: string | undefined,
  ) {
    super();
    this._id = id;
    this._userName = userName;
    this._location = location;
    this._emote = emote;
    this._emotes = emotes;
    this._status = status;
  }

  set location(newLocation: PlayerLocation) {
    this._location = newLocation;
    this._updateGameComponentLocation();
    this.emit('movement', newLocation);
  }

  get location(): PlayerLocation {
    return this._location;
  }

  set emote(newEmote: Emote | undefined) {
    this._emote = newEmote;
  }

  set emotes(newEmotes: string[] | undefined) {
    this._emotes = newEmotes;
  }

  get emote(): Emote | undefined {
    return this._emote;
  }

  get emotes(): string[] | undefined {
    return this._emotes;
  }

  set status(newStatus: string | undefined) {
    this._status = newStatus;
  }

  get status(): string | undefined {
    return this._status;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  toPlayerModel(): PlayerModel {
    return {
      id: this.id,
      userName: this.userName,
      location: this.location,
      emote: this._emote,
      status: this._status,
    };
  }

  private _updateGameComponentLocation() {
    if (this.gameObjects && !this.gameObjects.locationManagedByGameScene) {
      const { sprite, label, emote, status } = this.gameObjects;
      if (!sprite.anims) return;
      sprite.setX(this.location.x);
      sprite.setY(this.location.y);
      label.setX(this.location.x);
      label.setY(this.location.y - 20);
      if (this.location.moving) {
        sprite.anims.play(`misa-${this.location.rotation}-walk`, true);
      } else {
        sprite.anims.stop();
        sprite.setTexture('atlas', `misa-${this.location.rotation}`);
      }
      if (emote) {
        emote.setX(this.location.x + 20);
        emote.setY(this.location.y - 40);
      }
      if (status) {
        status.setX(this.location.x);
        status.setY(this.location.y + 40);
      }
    }
  }

  static fromPlayerModel(modelPlayer: PlayerModel): PlayerController {
    return new PlayerController(
      modelPlayer.id,
      modelPlayer.userName,
      modelPlayer.location,
      modelPlayer.emote,
      modelPlayer.emotes,
      modelPlayer.status,
    );
  }
}
