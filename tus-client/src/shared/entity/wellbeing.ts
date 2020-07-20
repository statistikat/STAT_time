
import { EntitySerializable } from './entity-serializable';
import { Entity } from './entity';

export class Wellbeing extends Entity implements EntitySerializable<Wellbeing> {
  
  at: Date;
  updated: Date;
  later: boolean;
  lucky: number;
  relaxed: number;
  like: number;

  deserialize(input: any): Wellbeing {

    this.at = new Date(input.at);
    this.updated = new Date(input.updated);
    this.later = input.later;
    this.lucky = input.lucky;
    this.relaxed = input.relaxed;
    this.like = input.like;

    return this;
  }
}
