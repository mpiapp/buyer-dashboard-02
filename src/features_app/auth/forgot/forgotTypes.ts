/* istanbul ignore file */

export interface ForgotState {
    forgot: boolean;
    loading: boolean;
    error? : any
  }
  
  
  export interface ValueEmail {
    email: string;
  }
  

  export interface UserFormSubmit {
    email: string,
  }