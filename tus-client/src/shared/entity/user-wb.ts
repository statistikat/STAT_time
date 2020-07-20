
import { Entity } from './entity';
import { EntitySerializable } from './entity-serializable';


export class UserWb extends Entity implements EntitySerializable<UserWb> {

    wb: number;
    later: boolean;

    deserialize(input: any): UserWb {
        
        this.id = input.id;
        this.wb = input.wb;
        this.later = input.later;
        return this;
    }
}