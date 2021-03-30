import { Quest } from './quest';
import { UserWb } from './user-wb';
import { EntitySerializable } from './entity-serializable';
import { Entity } from './entity';
import { Log } from './log';

export class User extends Entity implements EntitySerializable<User> {
  // id: string; // user id
  username: string;
  day: Date; // questionnaire day
  // wellbeing: number[];  // wellbeing notification times
  config: { [key: string]: any };  // configuration set for this User
  paradata: { [key: string]: any };  // paradata retrieved from this user
  quests: Quest[];
  userWbs: UserWb[];
  logs: Log[];
  version: string;

  deserialize(input: any): User {
    this.id = input.id;
    this.username = input.username;
    this.day = input.day;

    // quests
    if (input.quests != undefined) {
      this.quests = new Array<Quest>();
      for (const quest of input.quests) {
        this.quests.push(new Quest().deserialize(quest));
      }
    }

    // uesrbs
    if (input.userWbs != undefined) {
      this.userWbs = new Array<UserWb>();
      for (const userWb of input.userWbs) {
        this.userWbs.push(new UserWb().deserialize(userWb));
      }
    }

    return this;
  }
}
