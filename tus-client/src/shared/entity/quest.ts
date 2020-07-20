import { Wellbeing } from './wellbeing';
import { Item } from './item';
import { EntitySerializable } from './entity-serializable';
import { Entity } from './entity';


export class Quest extends Entity implements EntitySerializable<Quest> {

    questNo: number;
    finished: boolean;
    created: Date;
    updated: Date;
    slots: Item[];
    wbs: Wellbeing[];

    deserialize(input: any): Quest {
        this.questNo = input.questNo;
        this.finished = input.finished;
        this.created = new Date(input.created);
        this.updated = new Date(input.updated);

        if (input.slots != undefined) {
            this.slots = new Array<Item>();
            for (const slot of input.slots) {
                this.slots.push(new Item().deserialize(slot));
            }
        }

        if (input.wbs != undefined) {
            this.wbs = new Array<Wellbeing>();
            for (const wb of input.wbs) {
                this.wbs.push(new Wellbeing().deserialize(wb));
            }
        }


        return this;
    }
}