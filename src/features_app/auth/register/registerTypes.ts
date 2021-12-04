/* istanbul ignore file */

  export interface RegisterState {
    register: boolean;
    loading : boolean;
    error? : any;
  }
  
  export interface InputState {
    email: string;
    password : string;
    fullname: string;
    company_name: string;
  }
 
  export interface UserFormSubmit {
    email: string;
    password: string;
    fullname: string;
    company_name: string;
  }