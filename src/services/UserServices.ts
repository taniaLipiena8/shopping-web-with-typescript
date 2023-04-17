import loginapi from ".././api/loginApi";
import { IUserLogin } from "../models/interfaces/UserInterfaces";
import { AxiosError } from "axios";

export const loginUser = async (values: IUserLogin) => {
  try {
    const { data } = await loginapi.post("/perpustakaan/api/v1/user/login", {
      email: values.email,
      password: values.password,
    });

    return Promise.resolve(data.data);
    
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return Promise.reject(error.response?.data.message);
    } else {
      console.log("Unexpected error", error);
    }
  }
};
