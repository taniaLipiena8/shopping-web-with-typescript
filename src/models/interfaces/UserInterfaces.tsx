export interface IUser {
  username: string;
}


export interface IUserLogin{
  email: string,
  password: string
}

export interface LoginData{
  data:IUser
}