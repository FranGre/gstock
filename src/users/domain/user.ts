import { UserId } from "./value-objects/user-id/user-id";
import { UserName } from "./value-objects/user-name/user-name";
import { UserPhone } from "./value-objects/user-phone/user-phone";

export class User {

    constructor(private _id: UserId, private _name: UserName, private _phone: UserPhone) {}

    id(): UserId {
        return this._id;
    }

    name(): UserName {
        return this._name;
    }

    phone(): UserPhone {
        return this._phone;
    }

}