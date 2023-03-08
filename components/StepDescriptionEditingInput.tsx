import { aStep, PocketedJob } from '@/lib/database';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

interface StepDescriptionEditingInputProps
{
    step: aStep;
    setNewPocketedJobValues: Function;
    index: number;
}

export default function StepDescriptionEditingInput({
    step,
    setNewPocketedJobValues,
    index
}:StepDescriptionEditingInputProps){
    const [reRender, setRerender]= useState(0)

    if(typeof(step.stepDescription)=== 'string'){
        return(
            <div
            style={{
                marginTop: '10px'
            }}
            >
                <IconButton 
                sx={{color: 'red'}}
                onClick={()=>{
                    setNewPocketedJobValues((previous: PocketedJob)=>{
                        let copyObj= {...previous}
                        copyObj.steps[index].stepDescription = null
                        setRerender(previous=> previous + 1)
                        return copyObj
                    })

                }}>
                    <RemoveCircleTwoToneIcon />
                </IconButton>
               <TextField onChange={(e)=>{
                setNewPocketedJobValues((previous: PocketedJob)=>{
                    let copyObj= {...previous}
                    copyObj.steps[index].stepDescription = e.target.value
                    setRerender(previous=> previous + 1)
                    return copyObj
                })
            }} value={step.stepDescription}/> 
            </div>
            
        )
    }else{
        return (
            <div
            style={{
                marginTop: '10px'
            }}
            >
                <Button
                onClick={()=>{
                    setNewPocketedJobValues((previous: PocketedJob)=>{
                        let copyObj= {...previous}
                        copyObj.steps[index].stepDescription = ""
                        setRerender(previous=> previous + 1)
                        return copyObj
                    })

                }}
                >Add a Description to Step {step.stepNumber}</Button>
            </div>
        
        )

    }


}