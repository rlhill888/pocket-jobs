import React, { useState } from 'react';
import "@/styles/components.css/MainPageToDoCssCheckBox.css"
import Checkbox from '@mui/material/Checkbox';
import { aStep, PocketedJob } from '@/lib/database';
import { Button, ButtonGroup } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';

interface MainPageToDoCheckBoxProps
{
    step: aStep;
    crossedOut: boolean;
    setModalChildren: Function;
    setModalOpen: Function;
    setLoading: Function;
    refreshData: Function;
    loading: boolean;
    setReRender: Function;
}

export default function MainPageToDoCheckBox({
    step,
    crossedOut,
    setModalChildren,
    setModalOpen,
    setLoading,
    refreshData,
    loading,
    setReRender
}:MainPageToDoCheckBoxProps){
    const [activeStep, setActiveStep]= useState((step.pocketedJob.steps as aStep[]).findIndex((pocketedJobStep)=>{
        return pocketedJobStep.id === step.id
    }))
    const router = useRouter()

    function returnDateString(date: string){
        
        const newDate = new Date(date)
        return newDate.toDateString()
    }

    return (
        <div className={`toDoDiv ${crossedOut ? 'crossedOutToDoDiv' : ''}`}>
            <Checkbox onClick={()=>{
                setModalOpen(true)
                setModalChildren(
                crossedOut ?

                <div>

                    <h2>Set {step.name} as Uncompleted?</h2>
                    {loading ? <h3>Updating Your Step
                        <CircularProgress color='secondary'/>
                    </h3> : <></>}
                    <ButtonGroup variant='contained' color='secondary'>
                        <Button
                        variant='contained' color='secondary'
                        disabled={loading}
                        onClick={ async ()=>{
                            setLoading(true)
                            setReRender((previous: number)=> previous + 1)
                            setModalOpen(false)
                            try{
                                const response = await axios({
                                    url: '/api/Steps/update_step_completion',
                                    method: 'PATCH',
                                    data: {
                                        step: step,
                                        value: false
                                    }
                                })
                                console.log(response.data)
                                refreshData()
                            }catch(error){
                                console.log(error)
                            }
                            setLoading(false)
                        }}
                        >Yes</Button>
                        <Button
                        variant='contained' color='secondary'
                        disabled={loading}
                        onClick={()=>{
                            setModalOpen(false)
                            setModalChildren(<></>)
                        }}
                        >No</Button>
                    </ButtonGroup>

                </div>
                :
                <div>
                    <h2>Set {step.name} as Completed? </h2>
                    {loading ? <h3>Updating Your Step 
                        <CircularProgress color='secondary'/>
                    </h3> : <></>}
                    <ButtonGroup>
                        <Button
                        variant='contained' color='secondary'
                        disabled={loading}
                        onClick={ async ()=>{
                            setLoading(true)
                            setReRender((previous: number)=> previous + 1)
                            setModalOpen(false)
                            try{
                                const response = await axios({
                                    url: '/api/Steps/update_step_completion',
                                    method: 'PATCH',
                                    data: {
                                        step: step,
                                        value: true
                                    }
                                })
                                console.log(response.data)
                                refreshData()
                            }catch(error){
                                console.log(error)
                            }
                            setLoading(false)
                        }}
                        >Yes</Button>
                        <Button 
                        variant='contained' color='secondary'
                        disabled={loading}
                        onClick={()=>{
                            setModalOpen(false)
                            setModalChildren(<></>)
                        }}
                        >No</Button>
                    </ButtonGroup>
                
                </div>
                
                )
            }}  checked={crossedOut} color='secondary'/>

            
            <h3 onClick={()=>{
                setReRender((previous: number)=> previous + 1)
                setModalOpen(true)
                setModalChildren(
                <div>
                    <Stepper
                    activeStep={activeStep}
                    color='secondary'
                    >
                        {
                            step.pocketedJob.steps.map((theStep: aStep, index: number)=>{
                                return(
                                    <Step
                                    key={`modal div step ${theStep.id}`}
                                    completed={theStep.completed}
                                    >
                                        {
                                            activeStep === index ? 
                                            <></>
                                            :
                                            <>
                                            {theStep.name}
                                            </>
                                        }
                                        
                                        <StepLabel>

                                        </StepLabel>
                                        <StepContent>
                                            {step.stepDescription}
                                            {
                                                step.dueDate !== undefined && step.dueDate !== null

                                                ?
                                                <h3>Due: {returnDateString(theStep.dueDate as string)}</h3>
                                                :
                                                <></>

                                            }
                                            
                                        </StepContent>

                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    {/* <ButtonGroup
                    sx={{
                        marginTop: '20px'
                    }}
                    variant='contained'>
                        <Button 
                        onClick={()=>{
                            setReRender((previous: number)=> previous + 1)
                            setActiveStep(previous=> previous -1)
                        }}
                        disabled={activeStep === 0 ? true : false} variant='contained'>
                            <ArrowBackIosIcon />

                        </Button>
                        <Button 
                        onClick={()=>{
                            setReRender((previous: number)=> previous + 1)
                            setActiveStep(previous=> previous +1)
                        }}
                        disabled={activeStep=== step.pocketedJob.steps.length -1 ? true : false} variant='contained'>

                            <ArrowForwardIosIcon />

                        </Button>
                    </ButtonGroup> */}
                    <h2 
                    style={{
                        marginTop: '50px'
                    }}
                    onClick={()=>{
                        router.push(`/pocketed_job/${step.pocketedJob.id}`)
                    }}
                    className='toDoHeader'>{(step.pocketedJob as PocketedJob).jobPositionName} at {(step.pocketedJob as PocketedJob).companyName}</h2>

                </div>
                )
            }} className='toDoHeader'>{step.name}</h3>
            {step.dueDate ? <h4>{returnDateString(step.dueDate)}</h4> : <div></div>}
            
        </div>
    )

}