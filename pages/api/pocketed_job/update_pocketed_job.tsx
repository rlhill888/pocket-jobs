
import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { PocketedJob } from "@prisma/client";
import { aStep } from "@/lib/database";
import { db } from "@/lib/db";

interface updatePocketedJobBody{
    pocketedJob: PocketedJob;
    steps: string | aStep[];
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{

    const body: updatePocketedJobBody = req.body

    const newPocketedJob = body.pocketedJob

   
      
    const user = await getUserFromCookie(req.cookies)

    if(user && req.method === 'PATCH' && user.id === newPocketedJob.userId){

        const updatedPocketedJob = await db.pocketedJob.update({
            where: {
                id: body.pocketedJob.id
            },
            data: {
                salary: newPocketedJob.salary,
                jobPositionName: newPocketedJob.jobPositionName,
                companyName: newPocketedJob.companyName,
                jobUrl: newPocketedJob.jobUrl,
                description: newPocketedJob.description,
                color: newPocketedJob.color,
                jobColumns: JSON.stringify(newPocketedJob.jobColumns),
                rejected: newPocketedJob.rejected,
                offerMade: newPocketedJob.offerMade,
                notes: JSON.stringify(newPocketedJob.notes)
            }
        })

        return res.json(updatedPocketedJob)

    }else{
        res.status(401)
        return res.json({error: 'unauthorized'})
    }

   }catch(error){
      res.status(403)
      res.json({error: 'error'})
      console.log(error)
   
   }
   
    
}