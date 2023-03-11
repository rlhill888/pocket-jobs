import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";

interface body {
    jobBoardId: string;
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body: body = req.body
    const user = await getUserFromCookie(req.cookies)

    let deletedPocketedJobsArray = []
    
    if(user){

        const jobBoard = await db.jobBoard.findUnique({
            where: {
                id: body.jobBoardId
            },
            include: {
                pocketedJobs: {
                    include: {
                        steps: true
                    }
                }
            }
        })

        for(let job of (jobBoard as any).pocketedJobs){
            try{

                for(let step of job.steps){
                    try{
                        const deletedStep = await db.step.delete({
                            where: {
                                id: step.id
                            }
                        })

                    }catch(error){
                        res.status(422)
                        res.json({error: error})
                        console.log(error)
                    }
                }
                
                const deletedPocketedJob = await db.pocketedJob.delete({
                    where: {
                        id: job.id
                    }
                })
                deletedPocketedJobsArray.push(job)

            }catch(error){
                res.status(422)
                res.json({error: error})
                console.log(error)
            }
        }
        const deleteJobBoard = await db.jobBoard.delete({
            where: {
                id: body.jobBoardId
            }
        })
        res.json({
            message: 'job Board Deleted',
            jobBoard: deleteJobBoard,
            pocketedJobsDeleted: deletedPocketedJobsArray
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