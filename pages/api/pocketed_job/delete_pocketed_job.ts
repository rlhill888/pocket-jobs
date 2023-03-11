import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";

interface body {
    pocketedJobId: string;
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body: body = req.body
    const user = await getUserFromCookie(req.cookies)
    let stepsArray = []
    
    if(user){
        const pocketedJob = await db.pocketedJob.findUnique({
            where: {
                id: body.pocketedJobId
            },
            include: {
                steps: true
            }
        })

        for( let step of (pocketedJob as any).steps){
            try{

                const deletedStep = await db.step.delete({
                    where: {
                        id: step.id
                    }
                })

                stepsArray.push(step)
            }catch(error){
                res.status(422)
                res.json({error: error})
                console.log(error)

            }
        }
        const deletePocketedJob = await db.pocketedJob.delete({
            where: {
                id: body.pocketedJobId
            }
        })
        res.json({
            message: 'Pocketed Job Deleted',
            jobBoard: deletePocketedJob,
            deletedSteps: stepsArray
        })
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