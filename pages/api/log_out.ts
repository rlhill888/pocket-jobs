import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";

interface body{
    
}

export default async function loadToDoList(req: NextApiRequest, res: NextApiResponse){
   try{
    const body = req.body
    const user = await getUserFromCookie(req.cookies)

    
    if(user){

        const jwt = '123'
        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME as string, jwt, {
              httpOnly: true,
              path: "/",
              maxAge: -1,
            })
          );
          res.status(201);
        res.json('done')
        
    }else{
        res.status(401)
        res.json({error: 'Unauthorized'})
    }

   }catch(error){
      res.status(422)
      res.json({error: error})
      console.log(error)
   
   }
   
    
}