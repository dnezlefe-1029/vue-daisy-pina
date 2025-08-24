export interface IDoctor {
  id: string;
  firstName: string;
  lastName: string;
  state: string;
  dob: string;
  licenseActive: boolean;
  signedUpDate: string;
}

export interface InitState<T> {
  loading: boolean;
  error: string | null;
  items: T[];
}