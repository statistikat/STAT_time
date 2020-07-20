import { Entity } from './entity';
import { EntitySerializable } from './entity-serializable';


export class Log extends Entity implements EntitySerializable<Log> {
  at: Date;
  log: string;

  deserialize(Input: any): Log {
    return this;
  }

}
