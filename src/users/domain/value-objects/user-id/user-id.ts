import { randomUUID } from "crypto";

export class UserId {
    private readonly _id: string;

    constructor() {
        this._id = randomUUID();
    }

    value(): string {
        return this._id;
    }

}