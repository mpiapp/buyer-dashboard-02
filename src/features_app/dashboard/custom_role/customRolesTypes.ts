export interface IDataRowRoles {
    _id: string;
    role: string;
    modules? : any[];
    selector? : any;
}


export interface UserSuperadminInput {
    name: string;
    password: string;
    email: string;
    role?: string;
    flag? : string;
    status?: string;
    _id?: string;
}
