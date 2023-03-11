import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";

interface body {
    jobBoardId: string;
    name: string;
    description: string;
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body: body = req.body
    const user = await getUserFromCookie(req.cookies)
    
    if(user){

        const updateJobBoard = await db.jobBoard.update({
            where: {
                id: body.jobBoardId,
            },
            data: {
                name: body.name,
                description: body.description
            }
        })
        res.json(updateJobBoard)
       
    }else{
        res.status(401)
        res.json({error: 'unauthorized'})
    }

   }catch(error){
      res.status(422)
      res.json({error: error})
      console.log(error)
   
   }
   
    
}