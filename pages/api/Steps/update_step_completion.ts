import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";
import { Step } from "@prisma/client";

interface body{
    step: Step;
    value: boolean;
}

export default async function loadToDoList(req: NextApiRequest, res: NextApiResponse){
   try{
    const body = req.body
    const user = await getUserFromCookie(req.cookies)

    
    if(user && body.step.pocketedJob.userId === user.id){
        const updatedStep = await db.step.update({
            where: {
                id: body.step.id
            },
            data: {
                completed: body.value
            }
        })
        
        res.json(updatedStep)
    }else{
        res.status(401)
        res.json({error: 'Unauthorized'})
    }

   }catch(error){
      res.status(403)
      res.json({error: error})
      console.log(error)
   
   }
   
    
}