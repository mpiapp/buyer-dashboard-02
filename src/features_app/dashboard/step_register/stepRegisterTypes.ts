export interface UserFormSubmit {
    legalname: string;
    aliasname: string;
    phonenumber: number;
    whatsapp: number;
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    company_category?: string;
    type?: string;
    country?: string;
    city?: string;
    district?: string;
    subdistrict?: string;
    postcode: string;
    street: string;
}

export interface InitialState {
  step_state : number
}

export interface IUserManagement {
  fullname : string;
  email : string;
  password: string;
  role?: string;
}