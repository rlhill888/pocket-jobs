
import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { PocketedJob, prisma, Step } from "@prisma/client";
import { aStep } from "@/lib/database";
import { db } from "@/lib/db";

interface updatePocketedJobBody{
    pocketedJob: PocketedJob;
    steps: Step[];
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{

    const body: updatePocketedJobBody = req.body

    const newPocketedJob = body.pocketedJob

   let stepsData: any = {
    created: [],
    updated: [],
    destroyed: [],
   }
      
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
            },
            include: {
                steps: true
            }
        })
        const initialSteps = updatedPocketedJob.steps
        const newSteps = body.steps 

        let stepsUpdatedArray: Step[] = []
        let stepsDeletedArray: Step[] = [...initialSteps]
        let creatingNewSteps: Step[] = []

        for(let step of newSteps){
            const index = stepsDeletedArray.findIndex((value: Step)=>{
                return value.id === step.id
            })
            if(index !== -1){
                stepsDeletedArray.splice(index, 1)
            }
        }

        for(let step of initialSteps){
            let foundValue
            const index = newSteps.findIndex((value: Step)=>{
                foundValue = value
                return value.id === step.id
            })
            if(index !== -1 && foundValue && step !== foundValue){
                stepsUpdatedArray.push(foundValue)
            }
        }
        for(let step of newSteps){
            let newStep = true
            for(let oldStep of initialSteps){
                if(step.id === oldStep.id){
                    newStep = false
                }
            }
            if(newStep){
                creatingNewSteps.push(step)
            }
        }

        for(let step of stepsUpdatedArray){
            try{
                const updatedStep = await db.step.update({
                    where: {
                        id: step.id
                    },
                    data: {
                        name: step.name,
                        stepNumber: step.stepNumber,
                        stepDescription: step.stepDescription,
                        currentStep: step.currentStep,
                        completed: step.completed,
                        dueDate: step.dueDate
                    }
                })
                stepsData.updated.push(updatedStep)

            }catch(error){
                console.log(error)
                res.status(422)
                return res.json({error: error})
            }
        }

        for(let step of stepsDeletedArray){
            try{
                const deletedStep = await db.step.delete({
                    where: {
                        id: step.id
                    }
                })
                stepsData.destroyed.push(deletedStep)

            }catch(error){
                console.log(error)
                res.status(422)
                return res.json({error: error})
            }

        }

        for(let step of creatingNewSteps){
            try{
                const createdStep = await db.step.create({
                    data: {
                        name: step.name,
                        stepNumber: step.stepNumber,
                        stepDescription: step.stepDescription,
                        currentStep: step.currentStep,
                        pocketedJobId: newPocketedJob.id,
                        completed: step.completed,
                        dueDate: step.dueDate
                    }
                })
                stepsData.created.push(createdStep)

            }catch(error){
                console.log(error)
                res.status(422)
                return res.json({error: error})
            }

        }


        return res.json([updatedPocketedJob, stepsData])

    }else{
        res.status(401)
        return res.json({error: 'unauthorized'})
    }

   }catch(error){
      res.status(422)
      res.json({error: 'error'})
      console.log(error)
   
   }
   
    
}