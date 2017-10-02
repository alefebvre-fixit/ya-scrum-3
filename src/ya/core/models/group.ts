export class Group {

    $key: string;
    name: string;
    info: GroupInfo;

    public static getUpdate(group: any): any {

        const result = Object.assign({}, group);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(): Group {
        const result: Group = new Group();
        return result;
    }

}

export class GroupInfo {

    groupId: string;
    name: string;

}



