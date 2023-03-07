import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import axios from "axios";



export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword, hashedPassword) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;
  
    return new SignJWT({ payload: { id: user.id, email: user.email } })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt) => {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  
    return payload.payload as any;
  };



export const getUserFromCookie = async (cookies: any) => {
  

  const { id } = await validateJWT(cookies[process.env.COOKIE_NAME as string]);
  try{
    const user = await db.user.findUnique({
      where: {
        id: id as string,
      },
      include: {
        jobBoards: {
          include: {
            pocketedJobs: true
          }
        },
        pocketedJobs: {
          include: {
            jobBoard: true,
            steps: true
          }
        }
      }
    });
    return user;
  }catch(error){
    console.log(error)
  }
  

  
};

export const grabUser= async (setUser: Function, router: any) =>{
  try{

    const response = await axios({
        url: '/api/me',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
    })
    setUser(response.data)

  }catch(error){
    router.push('/signin')
  }  
}
