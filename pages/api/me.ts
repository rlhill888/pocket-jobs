
import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
      
    const user = await getUserFromCookie(req.cookies)

    if(!user){
      res.status(401)
      res.json({error: 'unauthorized'})
    }

    res.json(user)

   }catch(error){
      res.status(422)
      console.log(`Here is the error: ${error}`)
      res.json({error: error})
   
   }
   
    
}