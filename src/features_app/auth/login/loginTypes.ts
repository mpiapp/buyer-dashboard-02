/* istanbul ignore file */

export interface DataUser {
    access_token : string;
    id_token : string;
    expires_in : number;
    email : string;
    fullname : string;
    role: string;
    avatar : string;
    first_time : boolean;
    auth_id : string;
    login : boolean;
  }
  
  export interface LoginState {
    login: boolean;
    loading : boolean;
    error? : any;
    data : DataUser;
  }
  
  export interface InputState {
    email: string;
    password : string;
  }
 
  export interface UserFormSubmit {
    email: string,
    password: string
  }