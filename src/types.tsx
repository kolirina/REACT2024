export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  picture?: string | null;
  country: string;
  termsAccepted: boolean;
}

export interface CountryState {
  countries: string[];
}
