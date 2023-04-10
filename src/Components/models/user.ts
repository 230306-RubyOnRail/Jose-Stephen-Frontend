export class User {
    id: number;
    token: string;
    user_first_name: string;
    user_last_name: string;
    user_role: boolean
    
    constructor(id: number, token: string, user_first_name:string, user_last_name:string, user_role:boolean){
        this.id = id;
        this.token = token;
        this.user_first_name = user_first_name;
        this.user_last_name = user_last_name;
        this.user_role = user_role;
    }
}