import { User } from './../entity/user';
import { LoginData } from './../entity/login-data';
import { EntitySerializable } from './../entity/entity-serializable';

export class UpdateUser implements EntitySerializable<UpdateUser> {

    success: boolean;
    loginData: LoginData;
    user: User;

    deserialize(input: any): UpdateUser {
        
        this.success = input.success;
        this.loginData = input.loginData;
        this.user = input.user;
        
        return this;
    }
}