import { Entity } from './entity';
import { EntitySerializable } from './entity-serializable';


export class Item extends Entity implements EntitySerializable<Item> {
  id: number;
  start: Date;
  ende: Date;
  updated: Date
  primaryActivity: string;
  secondaryActivity: string;
  allein: boolean;
  partner: boolean;
  kind: boolean;
  mitglied: boolean;
  andere: boolean;
  ort: number;
  hidden: boolean;
  selected: boolean;

  deserialize(Input: any): Item {
    return this;
  }

}
