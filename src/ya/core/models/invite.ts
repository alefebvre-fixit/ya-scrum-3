export class Invite {

    $key: string;

    name = '';
    email = '';
    date: string;
    groupId: string;

    $exists?(): any;

    public static getUpdate(group: any): any {

        const result = Object.assign({}, group);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(): Invite {
        const result: Invite = new Invite();
        return result;
    }

}

