export class User {

    $key: string;
    name: string;
    email: string;
    role: string;
    team: string;

    public static getUpdate(user: any): any {

        const result = Object.assign({}, user);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(): User {
        const result: User = new User();
        return result;
    }

}

export class SignIn {
    email: string;
    password: string;
    group: string;
}

export class SignUp {
    name: string;
    email: string;
    password: string;
}

