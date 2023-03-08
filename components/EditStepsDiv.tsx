'use client'
import { aStep, PocketedJob } from '@/lib/database';
import { Button, IconButton, TextField } from '@mui/material';

import React, { useRef, useState } from 'react';
import { StepDateEditingInput } from './StepDateEditingInput';
import StepDescriptionEditingInput from './StepDescriptionEditingInput';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

interface EditStepsDivProps
{
    steps: aStep[];
    setNewPocketedJobValues: Function;
    newPocketedJobValues: PocketedJob;
    setActiveStep: Function;
}

export default function EditStepsDiv({
    steps,
    setNewPocketedJobValues,
    newPocketedJobValues,
    setActiveStep
}:EditStepsDivProps){
    const [reRender, setRerender]= useState(0)
    const addButtonRed = useRef()
   
    function addStep(e: any){
        e.nativeEvent.stopImmediatePropagation();
                
       
                setNewPocketedJobValues((previous: PocketedJob)=>{
                    let copyObj = {...previous}
                    let newValue: aStep = {
                        name: '',
                        currentStep: false,
                        completed: false,
                        stepNumber: newPocketedJobValues.steps.length + 1,
                        id: newPocketedJobValues.steps.length + 1
                    }
                    copyObj.steps.push(newValue)
                    setRerender(previous=> previous + 1)
                    return copyObj
                })

    }
    if(steps.length <=0){
        return (
            <div>
                <h2>You Currently Do Not Have Any Steps</h2>
                <Button
            onClick={(e)=> addStep(e)}

            >Add Step</Button>

            </div>
        )
    }

    return (
        <div className='mainEditingDiv'>
            <Button
            onClickCapture={(e)=> addStep(e)}

            >Add Step</Button>

            <div className='gridStepsEditingDiv'>
            {steps.map((step: aStep, index: number)=>{
                return(
                    <div 
                    className='subDiv'
                    key={`step ${step.id} editing menu`}>
                        <h2>
                            <IconButton
                            onClick={()=>{
                                setActiveStep(0)
                                setNewPocketedJobValues((previous: PocketedJob)=>{
                                    let copyObj = {...previous}
                                    
                                    const index = newPocketedJobValues.steps.findIndex(value=>{ 
                                        return value === step})
                                    if(index > -1){
                                        copyObj.steps.splice( index , 1)
                                        let copyCopyObj = {...copyObj}
                                        let newStepNumber = 1
                                        for(let step of copyCopyObj.steps){
                                            copyObj.steps[index].stepNumber = newStepNumber
                                            newStepNumber = newStepNumber + 1
                                        }

                                        setRerender(previous=> previous + 1)
                                        return copyObj
                                    }else{
                                        setRerender(previous=> previous + 1)
                                        return previous
                                    }
                                    
                                })
                            }}
                            >
                                <RemoveCircleTwoToneIcon sx={{color: 'red'}}/>
                            </IconButton>
                            Step {index + 1}</h2>
                        <TextField value={step.name} onChange={(e)=> setNewPocketedJobValues((previous: PocketedJob)=>{
                            let copyObj ={...previous}
                            copyObj.steps[index].name = e.target.value
                            setRerender(previous=> previous + 1)
                            return copyObj
                        })} label='Step Name'/>
                        <StepDescriptionEditingInput step={step} index={index} setNewPocketedJobValues={setNewPocketedJobValues}/>
                        <StepDateEditingInput step={step} setNewPocketedJobValues={setNewPocketedJobValues} index={index}/>
                        
                    </div>
                )
            })}

            </div>
            
            
        </div>
    )

}