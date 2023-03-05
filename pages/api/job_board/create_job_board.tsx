import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@prisma/client";
import { db } from "@/lib/db";

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body = req.body
    const user = await getUserFromCookie(req.cookies)
    console.log("body", body)
    if(user){
        const newJobBoard = await db.jobBoard.create({
            data: {
              name: body.name as string,
              description: body.description as string,
              defaultJobColumns: JSON.stringify(body.defaultJobColumns as string),
              userId: user.id,
            }
        })
        res.json(newJobBoard)
    }

   }catch(error){
      res.status(404)
      res.json({error: error})
      console.log(error)
   
   }
   
    
}