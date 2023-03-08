import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";

export default async function loadToDoList(req: NextApiRequest, res: NextApiResponse){
   try{
    const body = req.body
    const user = await getUserFromCookie(req.cookies)
    const boardDefaultColumns = JSON.stringify(defaultColumns)
    
    if(user){

        let steps = []
        const allPocketedJobs = await db.pocketedJob.findMany({
            where: {
                userId: user.id
            },
            include: {
                steps: {
                    include: {
                        pocketedJob: {
                            include: {
                                steps: true
                            }
                        }
                    }
                }
            }
        })
        for(let pocketedJob of allPocketedJobs){
            for(let pocketedJobStep of pocketedJob.steps){
                steps.push(pocketedJobStep)  
            }
          
        }
        return res.json(steps)
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