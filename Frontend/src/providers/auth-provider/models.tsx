export interface IRegister {
    userName: string;
    emailAddress: string;
    password: string;
    name: string;
    surname: string;
    roleName: string;
}

export interface ILogin {
    userNameOrEmailAddress: string;
    password: string;
}

export interface IUser {
    id?: number;
    userName: string;
    emailAddress: string;
    password: string;
    name: string;
    surname: string;
    roleName: string;
}