export interface ILoginBody {
  username: string;
  password: string;
}

export interface ISignUpBody extends ILoginBody {
  confirmPassword: string;
}

export interface IUser {
  _id: string;
  username: string;
  id: string;
}

export interface IAuthToken {
  user: IUser;
  token: string;
}
