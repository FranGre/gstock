import { randomUUID } from "crypto";

export class CategoryId {
    private readonly _id: string;

    constructor(id?: string) {
        this._id = id ?? randomUUID();
    }

    value(): string {
        return this._id;
    }

}