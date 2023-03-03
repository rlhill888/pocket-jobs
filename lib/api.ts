import axios from "axios"

interface signUpData{
  password: string;
  userName: string;
  firstName: string;
  LastName: string;
}

interface signInData{
  password: string;
  userName: string;
}
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
}
const fetcher = async ({ url, method, body, json = true }:any) => {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();
      return data;
    }
  };
  
  export const register = async (user: signUpData) => {
    return axios({
      url: "/api/register",
      method: "POST",
      data: user,
      headers: headers,
    });
  };
  
  export const signin = async (user: signInData) => {
    return axios({
      url: "/api/signin",
      method: "POST",
      headers: headers,
      data: user,
    });
  };