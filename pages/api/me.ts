
import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
      
    const user = await getUserFromCookie(req.cookies)
    console.log(user)
    res.json(user)

   }catch(error){
      res.status(404)
      res.json({error: 'error'})
      console.log(error)
   
   }
   
    
}