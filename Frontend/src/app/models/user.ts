export class User {
    idUser: number = 0;
    email: string = "";
    password: string = "";
    isAdmin: boolean = false;

    constructor(email: string, password: string, isAdmin?: boolean) {
        this.email = email;
        this.password = password;
        if (isAdmin != undefined && isAdmin != null)
        {
            this.isAdmin = isAdmin;
        }
    }
}
