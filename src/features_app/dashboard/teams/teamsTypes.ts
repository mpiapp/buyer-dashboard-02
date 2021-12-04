export interface IDataRowTeams {
    _id: string;
    name: string;
    email: string;
    role: string,
    status: string,
    selector? : any
}


export interface UserSuperadminInput {
    name: string;
    password: string;
    email: string;
    role?: string,
    flag? : string,
    status?: string,
    _id?: string;
}
