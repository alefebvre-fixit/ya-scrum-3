
import { Group } from './group';

export class User {

    $key: string;
    name: string;
    role: string;
    team: string;
    email: string;

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



export class AccountGroup {
    name: string;
    groupId: string;

    public static createFromGroup(group: Group): AccountGroup {

        const result = new AccountGroup();

        result.groupId = group.$key;
        result.name = group.name;

        return result;

    }
}

export class Account extends User {

    group: AccountGroup;

    public static getUpdate(account: any): any {

        const result = Object.assign({}, account);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static createFromUser(user: User, group: Group): Account {

        const account: Account = new Account();

        account.group = AccountGroup.createFromGroup(group);

        account.$key = user.$key;
        account.name = user.name;

        if (user.role) {
            account.role = user.role;
        }

        if (account.team) {
            account.team = user.team;
        }

        account.email = user.email;

        return account;
    }

}

export class SignIn {
    email: string;
    password: string;
}

export class SignUp {
    name: string;
    email: string;
    password: string;
}

