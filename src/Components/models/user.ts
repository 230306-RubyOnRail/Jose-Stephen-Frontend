export class User {
    user_id: number;
    token: string;
    user_first_name: string;
    user_last_name: string;
    user_role: boolean
    
    constructor(user_id: number, token: string, user_first_name:string, user_last_name:string, user_role:boolean){
        this.user_id = user_id;
        this.token = token;
        this.user_first_name = user_first_name;
        this.user_last_name = user_last_name;
        this.user_role = user_role;
    }
}