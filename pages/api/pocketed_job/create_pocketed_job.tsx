import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultColumns } from "@/lib/database";
interface body {
    defaultValues: string;
    extraValues: string;
    steps: string;
    allValues: string;
    jobBoardId: string;
}
interface Column{
    columnName: string;
    columnType: string;
    value: any;
}
interface aStep{
    name: string;
    dueDate?: string | null;
    stepDescription?: string | null;
    id: number;
}

export default async function me(req: NextApiRequest, res: NextApiResponse){
   try{
    const body: body = req.body
    const user = await getUserFromCookie(req.cookies)

    
    const defaultValues: Column[] = JSON.parse(body.defaultValues)
    const steps: aStep[]= JSON.parse(body.steps)
    let createdSteps = []

    console.log("body", body)
    let errors= []
    if(user){
       const pocketedJob = await db.pocketedJob.create({
        data: {
            salary: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Salary")].value,
            jobPositionName: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Job Position")].value,
            companyName: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Company Name")].value,
            jobUrl: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Job Url")].value,
            description: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Description")].value,
            color: defaultValues[defaultValues.findIndex((theValue)=> theValue.columnName === "Job color")].value,
            jobColumns: body.extraValues,
            userId: user.id,
            jobBoardId: body.jobBoardId
        },
       })
    

    for(let singleStep of steps){
        try{
            const createdStep = await db.step.create({
                data: {
                    name: singleStep.name,
                    stepNumber: singleStep.id,
                    stepDescription: singleStep.stepDescription,
                    currentStep: singleStep.id === 1 ? true: false,
                    pocketedJobId: pocketedJob.id,
                    dueDate: singleStep.dueDate ? singleStep.dueDate : undefined,
                }
            })
            createdSteps.push(createdStep)
        }catch(error){
            console.log(error)
            res.status(404)
            return res.json({error})
        }
    }

    return res.json([pocketedJob, createdSteps])
}


   }catch(error){
     console.log(error)
     res.status(404)
     res.json({error: error})
   
   }
   
    
}