export class Group {

    $key: string;
    name: string;

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


export class Workspace {

    $key: string;
    name: string;

    public static getUpdate(group: any): any {

        const result = Object.assign({}, group);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(group: Group): Workspace {
        const result: Workspace = new Workspace();
        result.name = group.name;

        return result;
    }
}



