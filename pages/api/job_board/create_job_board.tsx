import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body = req.body
    const user = await getUserFromCookie(req.cookies)
    const boardDefaultColumns = JSON.stringify(defaultColumns)
    
    if(user){
        const newJobBoard = await db.jobBoard.create({
            data: {
              name: body.name as string,
              description: body.description as string,
              extraJobColumns: JSON.stringify(body.extraJobColumns as string),
              defaultJobColumns: boardDefaultColumns,
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