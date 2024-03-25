export interface IFormErr {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface IFormErrs {
  errors: IFormErr[];
}
