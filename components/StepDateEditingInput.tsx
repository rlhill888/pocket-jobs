import { aStep, PocketedJob } from '@/lib/database';
import { Button, IconButton, TextField } from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import React, { useState } from 'react';

interface StepDateEditingInputProps
{
    step: aStep;
    setNewPocketedJobValues: Function;
    index: number;
    
}

export function StepDateEditingInput({

    step,
    setNewPocketedJobValues,
    index
}:StepDateEditingInputProps){
    const [reRender, setRerender]= useState(0)

    if(typeof(step.dueDate) === 'string'){
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
                        let copyObj = {...previous}
                        copyObj.steps[index].dueDate = null
                        setRerender(previous=> previous + 1)
                        return copyObj
                    })
                }}
                >
                    <RemoveCircleTwoToneIcon />
                </IconButton>
                <TextField
                type='date'
                value={step.dueDate}
                onChange={(e)=>{
                    setNewPocketedJobValues((previous: PocketedJob)=>{
                        let copyObj = {...previous}
                        copyObj.steps[index].dueDate = e.target.value
                        debugger
                        return copyObj
                    })
                    setRerender(previous=> previous + 1)
                }}
                ></TextField>
        </div>
        )

    }
    else{
        return (
            <div
            style={{
                marginTop: '10px'
            }}
            >
                <Button onClick={()=>{
                    setNewPocketedJobValues((previous: PocketedJob)=>{
                        let copyObj = {...previous}
                        copyObj.steps[index].dueDate = ""
                        setRerender(previous=> previous + 1)
                        return copyObj
                    })
                }}>Add Due Date</Button>
            </div>
        )

    }
        

    
    

}