import { defaultColumns } from '@/lib/database';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import "@/styles/components.css/PocketAJob.css"
import { gradientButton1 } from '@/styles/materialUiStyles';
import axios from 'axios';

interface PocketAJobProps
{
    jobBoard: any;
}

interface aStep{
    name: string;
    dueDate?: string | null;
    stepDescription?: string | null;
    id: Number;
}

export default function PocketAJob({
    jobBoard
}:PocketAJobProps){
const extraColumns = JSON.parse(jobBoard.extraJobColumns)
const [values, setValues]= useState(declareInitialValuesState())
const [steps, setSteps]: [aStep[], Function]= useState([])
function declareInitialValuesState(){
    const allValues = [...defaultColumns, ...extraColumns]

    let newValueArray = []

    for(let column of allValues){
        if(column.columnType === 'text'){
            newValueArray.push({
                columnName: column.columnName,
                value: "",
                columnType: column.columnType
            })
        }
        if(column.columnType === 'number'){
            newValueArray.push({
                columnName: column.columnName,
                value: null,
                columnType: column.columnType
            })
        }
        if(column.columnType === 'checkbox'){
            newValueArray.push({
                columnName: column.columnName,
                value: false,
                columnType: column.columnType
            })
        }
        if(column.columnType === 'date'){
            newValueArray.push({
                columnName: column.columnName,
                value: null,
                columnType: column.columnType
            })
        }
        if(column.columnType === 'link'){
            newValueArray.push({
                columnName: column.columnName,
                value: "",
                columnType: column.columnType
            })
        }
        if(column.columnType === 'file'){
            newValueArray.push({
                columnName: column.columnName,
                value: null,
                columnType: column.columnType
            })
        }
        if(column.columnType === 'phone number'){
            newValueArray.push({
                columnName: column.columnName,
                value: "",
                columnType: column.columnType
            })
        }
        if(column.columnType === 'email'){
            newValueArray.push({
                columnName: column.columnName,
                value: ""
            })
        }
        if(column.columnType === 'color'){
            newValueArray.push({
                columnName: column.columnName,
                value: "#FFFFFF",
                columnType: column.columnType
            })
        }
        
    }
    return newValueArray
    
}



function mapOutInputs(){
    const allValues = [...defaultColumns, ...extraColumns]
    return allValues.map((column: any, index)=>{
                if(column.columnName === "Rejected" || column.columnName === "Offer made"){
                    return(
                        <></>
                    )
                }
                if(column.columnType === 'text'){
                    return (
                    <div  key={`pocketed job input ${index} ${column.columnName}`}>
                        <TextField color={index % 2 ? 'primary' : 'secondary'} variant='standard' sx={{width: "100%"}} className='pocketedJobInputDiv' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'number'){
                    return(
                    <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnName}`}>

                        <TextField color={index % 2 ? 'primary' : 'secondary'} variant='standard' sx={{width: "100%"}} label={column.columnName} placeholder={`${column.columnName} Number`} type='number'  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'checkbox'){
                    return(
                       <div className='pocketedJobInputDiv2' key={`pocketed job input ${index} ${column.columnName}`}>
                        <h3>{column.columnName}</h3>
                        <Checkbox  color={index % 2 ? 'primary' : 'secondary'} checked={values[index].value as boolean} onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.checked
                        return copyArray
                    })}/>
                        </div>
                    )
                }
                if(column.columnType === 'date'){
                    return( 
                    <div className='pocketedJobInputDivDate' key={`pocketed job input ${index} ${column.columnName}`}>
                        <h3>{column.columnName}</h3>
                        <TextField color={index % 2 ? 'primary' : 'secondary'} label={""} variant='standard' sx={{width: "100%"}}    type='date'  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'link'){
                    return( 
                    <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnName}`}>
                        <TextField color={index % 2 ? 'primary' : 'secondary'} variant='standard' sx={{width: "100%"}} label={column.columnName} placeholder={column.columnType}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'file'){
                    return <p key={`placeholder file ${index}`}>placeholder file input <button onClick={()=>{
                        setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = true
                            return copyArray
                        })
                    }}></button></p>
                }
                if(column.columnType === 'phone number'){
                    return(
                        <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnType}`}>
                        <TextField color={index % 2 ? 'primary' : 'secondary'} variant='standard' sx={{width: "100%"}} type='tel' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.value
                        return copyArray
                    })}/>
                    </div>
                    )
                }
                if(column.columnType === 'email'){
                    return( 
                    <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnType}`}>
                    <TextField color={index % 2 ? 'primary' : 'secondary'} variant='standard' sx={{width: "100%"}} type='email' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.value
                        return copyArray
                    })}/>
                    </div>
                    )
                }
                if(column.columnType === 'color'){
                    return( 
                    <div className='pocketedJobInputDiv2' key={`pocketed job input ${index} ${column.columnName}`}>
                    <h3>{column.columnName}</h3>
                    <input type='color' value={values[index].value as string}   onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.value.toString()
                        return copyArray
                    })}/>
                    </div>
                    )
                }
                
                
                
            })
}

function determineDisabledButton(){
    for(const column of values){
        if(!column.value && column.columnType !== 'checkbox'){
            return true
        }
    }
    for(const aStep of steps){
        if(aStep.stepDescription==="" || aStep.dueDate === ""){
            return true
        }
        if(!aStep.name){
            return true
        }
    }
    return false
}





    return (
        <div>
            <div className='displayFlexRowHeaderJustifyContentSpaceBetween'>
                <h2>Job Information</h2>
                <Button onClick={ async ()=>{
                    let reqDefaultValuesArray= []
                    let reqExtraValuesArray= []


                    for( let value of values){
                        let index = defaultColumns.findIndex(defaultValue=> value.columnName === defaultValue.columnName && value.columnType === defaultValue.columnType)
                        if(index === -1){
                            reqExtraValuesArray.push(value)
                        }else{
                            reqDefaultValuesArray.push(values[index])
                        }
                    }

                    

                    

                    try{
                        const response = await axios({
                            method: 'POST',
                            url: '/api/pocketed_job/create_pocketed_job',
                            data: {
                                defaultValues: JSON.stringify(reqDefaultValuesArray),
                                extraValues: JSON.stringify(reqExtraValuesArray),
                                steps: JSON.stringify(steps),
                                allValues: JSON.stringify(values),
                                jobBoardId: jobBoard.id,
                            }
                        })
                        console.log(response)
                    }catch(error){
                        console.log(error)
                    }
                }} 
                variant='contained' color='secondary' disabled={determineDisabledButton()}>Pocket the Job</Button>
            </div>
            
            <div className='pocketAJobInputGrid'>
                {mapOutInputs()}
            </div>
            <hr className='pocketAJobH'/>
            <div>
            <div className='jobStepsCreatePocketedJob'>
                <h3>Job Application Follow Up Steps</h3>
                <Button
                onClick={()=>{
                    setSteps((previous: aStep[])=>{
                        let copyArray = [...previous]
                        copyArray.push({
                            name: "",
                            stepDescription: null,
                            dueDate: null,
                            id: copyArray.length + 1
                        })
                        return copyArray
                    })
                }}
                > <AddIcon /> Add A Step</Button>
            </div>
            <div className='createPocketJobStepContent'>

                <Stepper>
                {steps.map((step: aStep, index)=>{
                return(
                    <Step key={` create pocked job name step ${step.id}`}>
                        <StepLabel>
                            <TextField  value={step.name} onChange={(e)=>{
                                setSteps((previous: aStep[])=>{
                                    let copyArray = [...previous]
                                    copyArray[index].name = e.target.value
                                    return copyArray
                                })
                            }} variant='standard' color={index % 2 ? 'primary' : 'secondary'}></TextField>
                        </StepLabel>
                    </Step>
                )
                 })}

                </Stepper>
                <div className='stepDescriptionsDiv'>
                    {steps.map((individualStep: aStep, index)=>{
                        const step = individualStep
                        console.log(step)
                        if(typeof(step.stepDescription) === 'string'){
                            return(
                            <div style={{marginTop: "30px"}} key={`step description create pocketed job  ${step.id}`}> 

                                <div className='displayFlexRowHeaderJustifyContentSpaceBetween'>
                                    <div className='displayFlexRowHeader'>
                                        <IconButton 
                                        onClick={(e)=>{
                                            setSteps((previous: aStep[])=>{
                                                let copyArray= [...previous]
                                                copyArray.splice(index, 1)
                                                return copyArray
                                            })
                                        }} 
                                        sx={{color: 'red'}}>
                                            <CancelTwoToneIcon />
                                        </IconButton>
                                        <h3>{index +1}. {step.name} description</h3>
                                    </div>
                                    
                                    <Button
                                    onClick={()=>{
                                        setSteps((previous: aStep[])=>{
                                            let copyArray = [...previous]
                                            copyArray[index].stepDescription = null
                                            return copyArray
                                        })
                                    }}
                                    > Remove Step {index +1} Description</Button>
                                </div>
                                
                                <TextField value={step.stepDescription} onChange={(e: any)=> setSteps((previous: aStep[])=>{
                                    let copyArray = [...previous]
                                    copyArray[index].stepDescription = e.target.value 
                                    return copyArray
                                })} sx={{width: "100%"}}></TextField>

                            </div>
                            )
                        }else{
                            return(
                                <div className='descriptionButtonAndRemoveIconDivCreatePocketedJob' key={`step description create pocketed job  ${step.id}`}>
                                    <IconButton 
                                    onClick={(e)=>{
                                        setSteps((previous: aStep[])=>{
                                            let copyArray= [...previous]
                                            copyArray.splice(index, 1)
                                            return copyArray
                                        })
                                    }} 
                                    sx={{color: 'red'}}>
                                        <CancelTwoToneIcon />
                                    </IconButton>
                                    <Button sx={{width: "auto"}}
                                    onClick={()=>{
                                        setSteps((previous: aStep[])=>{
                                            let copyArray = [...previous]
                                            copyArray[index].stepDescription= ""
                                            return copyArray
                                        })
                                    }}
                                    >Add description for step {index +1}: {step.name}</Button>
                                </div>
                            )
                            
                        }
                    })}
                </div>
                {steps.length >=1 ? 
                        <div>
                             <hr className='pocketAJobH'/>
                             <h3> Step Due Dates</h3>
                            <div>
                            
                            {
                                steps.map((individualStep, index)=>{
                                    if(typeof(individualStep.dueDate) === 'string'){
                                        return(
                                            <div className='displayFlexRowHeader' key={`individual step due date ${individualStep.id}`}>
                                                <IconButton
                                                onClick={()=>{
                                                    setSteps((previous: aStep[])=>{
                                                        let copyArray = [...previous]
                                                        copyArray[index].dueDate = null
                                                        return copyArray
                                                    })
                                                }}
                                                sx={{color: "red"}}>
                                                    <CancelTwoToneIcon />
                                                </IconButton>
                                                <p>{`Step ${individualStep.id}. Due Date: `}</p>
                                                <TextField 
                                                color={index % 2 ? 'secondary' : 'primary'}
                                                onChange={(e)=> setSteps((previous: aStep[])=>{
                                                    let copyArray = [...previous]
                                                    copyArray[index].dueDate = e.target.value
                                                    return copyArray
                                                }) } variant='standard' type='date' sx={{marginLeft: "10px"}} ></TextField>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div key={`individual step due date ${individualStep.id}`}>
                                                <Button
                                                onClick={()=>{
                                                    setSteps((previous: aStep[])=>{
                                                        let copyArray = [...previous]
                                                        copyArray[index].dueDate = ""
                                                        return copyArray
                                                    })
                                                }}
                                                >{`Add a Due Date To step ${individualStep.id}: ${individualStep.name}`}</Button>
                                            </div>

                                        )
                                            
                                    }
                                })
                            }
                            </div>
                        </div>

                        :
                        <></>
                    
                }
                

            
            </div>
                
            </div>
            
        </div>
    )

}