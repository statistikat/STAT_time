import { EntitySerializable } from './entity-serializable';
import { Entity } from './entity';

export class Dict extends Entity implements EntitySerializable<Dict> {
    
    public var: boolean;
    public entry: string;

    deserialize(input: any): Dict {

        this.var = input.var;
        this.entry = input.entry;
        
        return this;
    }

}