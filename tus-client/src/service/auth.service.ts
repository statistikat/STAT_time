import { User } from './../shared/entity/user';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    public user: User;
    public token: string;
}