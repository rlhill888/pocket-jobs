'use client'
import React, { useEffect, useRef, useState } from 'react';
import "@/styles/loggedInUserView/PocketedJob.css"
import GlassCard from '../GlassCard';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TuneIcon from '@mui/icons-material/Tune';
import { darkenRGBValue, getFirstRGBValue, lightenRGBValue, convertColorToRGB } from '@/lib/theme';
import { Button, Checkbox, createTheme, IconButton, setRef, TextField, ThemeOptions, ThemeProvider } from '@mui/material';
import Loading from '../Loading';
import axios from 'axios';
import { queryIdFromUrl } from '@/lib/routing';
import { aStep, headers, JobColumn, Note, PocketedJob } from '@/lib/database';
import SaveIcon from '@mui/icons-material/Save';

import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import CreateNewNote from '../CreateNewNote';
import NoteModalDiv from '../NoteModalDiv';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ModalCard from '../ModalCard';
import EditStepsDiv from '../EditStepsDiv';
import '@/styles/components.css/editStepsDiv.css'
import { useRouter } from 'next/navigation';


interface PocketedJobProps
{
    
}
interface updatePocketedJobBody{
    pocketedJob: PocketedJob;
    steps: string | aStep[];
}

export default function PocketedJobComp({
    
}:PocketedJobProps){
   const [color, setColor]: [null | string, Function]= useState(null)
   const [modalOpen, setModalOpen]= useState(false)
   const [user, setUser]= useState(null)
   const [triedFetchingUser, setTriedFetchingUser]= useState(false)
   const [modalChildren, setModalChildren]= useState(<></>)
   const [refreshUserDataState, setRefreshUserData]= useState(0)
   const [mode, setMode]: ['light'| 'dark' | null, Function]= useState(null)
   const [noteModalOpen, setNoteModalOpen]= useState(false)
   const [noteModalContents, setNoteModalContents]= useState(<></>)
   const [thePocketedJob, setPocketedJob]: [PocketedJob, Function]= useState(null) as any
   const [initialPocketedJobValues, setInitialPocketedJobValues]: [PocketedJob, Function]= useState(null) as any
   const [newPocketedJobValues, setNewPocketedJobValues]: [PocketedJob, Function]= useState(null) as any
   const [newNoteTitle, setNewNoteTitle]= useState("")
   const [newNNoteDescription, setNewNoteDescription]= useState("")
   const [activeStep, setActiveStep]= useState(0)
   const [loadingText, setLoadingText]= useState('Loading Pocketed Job')
   const [loading, setLoading]= useState(false)
   const [modalWidthAndHeight, setModalWidthAndHeight]: [{width: string | null, height: string | null}, Function]= useState({
       width: null,
       height: null
   })
   const exitButton = useRef("Exit button")
   const router = useRouter()
   async function refreshUserData(){
       setRefreshUserData(previous=> previous+1)
   }

   function tempSave(){
    const initialSteps = [...initialPocketedJobValues.steps]
    const newSteps = [...newPocketedJobValues.steps]
    let stepsUpdatedArray = []
    let stepsDeletedArray = [...initialSteps]
    let creatingNewSteps = []

    for(let step of newSteps){
        const index = stepsDeletedArray.findIndex((value: aStep)=>{
            debugger
            return value.id === step.id
        })
        if(index !== -1){
            debugger
            stepsDeletedArray.splice(index, 1)
        }
    }

    for(let step of initialSteps){
        let foundValue
        const index = newSteps.findIndex((value: aStep)=>{
            foundValue = value
            return value.id === step.id
        })
        if(index && foundValue && step !== foundValue){
            stepsUpdatedArray.push(step)
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
    debugger
   }
   async function saveChanges(){

        setLoadingText('Saving Changes To Pocketed Job')
        setLoading(true)
        try{
            const response = await axios({
                url: '/api/pocketed_job/update_pocketed_job',
                method: 'PATCH',
                headers: headers,
                data: {
                    pocketedJob: newPocketedJobValues,
                    steps: newPocketedJobValues.steps
                } as updatePocketedJobBody,

            })
            console.log(response.data)
            await refreshUserData()
            setModalOpen(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }

   }
   console.log(newPocketedJobValues)
   useEffect(()=>{
    setLoading(true)
      async function fetchUser(){
       
       try{ 
           const response = await axios({
               url: '/api/me',
               headers: {
                   Accept: "application/json",
                   "Content-Type": "application/json",
                 }
           })
           setUser(response.data)
           setPocketedJob(()=>{
               const index= response.data.pocketedJobs.findIndex((pocketedJob: PocketedJob)=> pocketedJob.id === queryIdFromUrl(window.location.href))
               const rgbColor = convertColorToRGB(response.data.pocketedJobs[index].color)
               setColor(rgbColor)
               if(getFirstRGBValue(rgbColor) >= 127.5){
                    setMode('light')
               }
               if(getFirstRGBValue(rgbColor) < 127.5){
                setMode('dark')
           }
               let copyObj: PocketedJob = {...response.data.pocketedJobs[index]} 
               copyObj.jobColumns = JSON.parse(response.data.pocketedJobs[index].jobColumns)
               copyObj.notes = JSON.parse(response.data.pocketedJobs[index].notes)
               for(let step of response.data.pocketedJobs[index].notes){
                    if(step.currentStep){
                        setActiveStep(step.id - 1 as any)
                    }
               }
               setInitialPocketedJobValues(copyObj)
               setNewPocketedJobValues(copyObj)
           
               return copyObj
               
           })
           setTriedFetchingUser(true)
       
         }catch(error){
           setTriedFetchingUser(true)
         }  
      }
      fetchUser()
      setLoading(false)
           
   }, [refreshUserDataState])
   function hasDuplicates(arr: any[]) {
    let unique: any = {};
    for (let i = 0; i < arr.length; i++) {
      if (unique.hasOwnProperty(JSON.stringify(arr[i]))) {
        return true;
      } else {
        unique[JSON.stringify(arr[i])]  = true; 
      }
    }
    return false;
  }
  function removeDuplicates(arr: any[]) {
    let unique: any = {};
    for (let i = 0; i < arr.length; i++) {
      if (unique.hasOwnProperty(JSON.stringify(arr[i]))) {
        arr.splice(i, 1);
        i--;
      } else {
        unique[JSON.stringify(arr[i])] = true;
      }
    }
    return arr;
  }
//   function reformatDate(dateStr) {
//     const [year, month, day] = dateStr.split('-');
//     const date = new Date(`${month}-${day}-${year}`)
    
//     return date.toDateString();
//   }

  

  function setCompletedStepValue(trueOrFalse: Boolean, index: number){
    setNewPocketedJobValues((previous: PocketedJob)=>{
        let copyObj = {...previous}
        copyObj.steps[index].completed = trueOrFalse as any
        return copyObj
    })
  }

  function addStep(e: any){
    e.stopPropagation();
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
                return copyObj
            })


}

function returnDateString(date: string){
    const newDate = new Date(date.replace(/-/g, '\/'))
    return newDate.toDateString()
}


  if(newPocketedJobValues){
    if(hasDuplicates(newPocketedJobValues.notes)){
        setNewPocketedJobValues((previous: PocketedJob)=>{
            let copyObj = {...previous}
            copyObj.notes = removeDuplicates(newPocketedJobValues.notes)
            return copyObj
        })
      }
      

  }
  

   
   let lightenedColor
   let darkenedColor
   let themeOptions : ThemeOptions= {}
   if(color){
    
     darkenedColor = darkenRGBValue(color)
    lightenedColor = lightenRGBValue(color)
    console.log(color)
      themeOptions = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: color,
          },
          secondary: {
            main: '#3df5a7',
      
          },
          tertiary: {
            main: '#FFFFFF' 
          } ,
          fourth: {
            main: '#000000'
          }
        } as any,
      });

    
   }
   if(!color || !user || !thePocketedJob && triedFetchingUser){
    // handle functionality to re route users
    return <Loading loadingTitle='Loading Pocketed Job'/>
   }
   if(!color || !user || !thePocketedJob || loading){
    return <Loading loadingTitle={loadingText}/>
   }
    return (
        <div style={{
            backgroundImage: `linear-gradient( 109.6deg,  ${darkenRGBValue('rgb(255,255,255)')} 11.2%, ${lightenRGBValue('rgb(255,255,255)')} 71.1% )`
        }} className='mainPocketJobDiv'>
        <ThemeProvider theme={themeOptions}>
        <ModalCard
        width={'70vw'}
        height='70vh'
        modalOpen={modalOpen} setModalOpen={setModalOpen}>
            {modalChildren}

        </ModalCard>

        {
            noteModalOpen ?

            <div className='dragableNoteModalDiv'>
            <NoteModalDiv setNoteModalOpen={setNoteModalOpen} mode={mode} noteModalContents={noteModalContents}/>
            </div>
           
            :
            <></>


        }
        
        
        <div className={`otherMainPocketedJobsDiv ${getFirstRGBValue(color) <= 127.5 ? "pocketedJobDarkColor" : "pocketedJobDarkColor"}`}>
            <GlassCard className='pocketedJobsTitleDiv'>
                <div className='titleAndIconDiv'>
                    <DataUsageIcon color='primary' sx={{ marginRight: "10px"}}/>
                    <h1 className='pocketedJobTitle'>
                        {thePocketedJob.jobPositionName} at {thePocketedJob.companyName}
                    </h1>
                    

                </div>
                <div className='flexRowDivClass'>
                    <Button
                   
                    onClick={()=>{
                        router.push(`/job_board/${thePocketedJob.jobBoard.id}`)
                    }}
                    >
                        <KeyboardDoubleArrowLeftTwoToneIcon />
                        Back To {thePocketedJob.jobBoard.name} Job Board
                    </Button>
                    <IconButton
                    onClick={()=>{
                        setModalOpen(true)
                        setModalChildren(
                        <div>
                            <h1>Save Changes?</h1>
                            <ButtonGroup
                            variant='contained'
                            
                            >
                                <Button
                                onClick={async ()=>{
                                    saveChanges()
                                    // tempSave()
                                }}
                                >Yes</Button>
                                <Button
                                onClick={()=>{
                                    setModalOpen(false)
                                    setModalChildren(<></>)
                                }}
                                >No</Button>
                            </ButtonGroup>
                        </div>
                        )
                    }}
                    sx={{
                        marginLeft: '10px',
                    }}
                    
                    disabled={ initialPocketedJobValues === newPocketedJobValues ? true: false}
                    
                    > 
                        <SaveIcon />
                    </IconButton>
                </div>
                
                
            </GlassCard>
            <div className='pocketedJobCardsDivisionDiv'>
                <div className='jobDataAndNotesDiv'>
                    <GlassCard className='pocketedJobsColumnCard'>
                        <div className='headerAndIconDiv'>
                            <h3>Job Data Table</h3>
                            
                            

                        </div>
                        <div className='tableDiv'>

                        
                        <table>
                            <tr>
                                <th className='headersRow'>
                                    Salary
                                </th>
                                <th>
                                    Color
                                </th>
                                {
                                    thePocketedJob.jobColumns.map((column: JobColumn, index: Number)=>{
                                        return <th key={`extra column header ${index} ${column.columnName}`}>
                                            {column.columnName}
                                        </th>
                                    }) 
                                }
                                <th>
                                    Rejected
                                </th>
                                <th>
                                    Offer Made
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                    fullWidth
                                    onChange={(e)=>{
                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                            let copyObject = {...previous}
                                            copyObject.salary = e.target.value
                                            return copyObject
                                        })
                                    }} value={newPocketedJobValues.salary} variant='standard' ></TextField>
                                </td>
                                <td>
                                    <input type='color' value={newPocketedJobValues.color as string} onChange={(e)=> setNewPocketedJobValues((previous: PocketedJob)=>{
                                        let copyObject = {...previous}
                                        copyObject.color = e.target.value
                                        return copyObject
                                    })}></input>
                                </td>
                                {
                                    thePocketedJob.jobColumns.map((column: JobColumn, index: number)=>{
                                        if(column.columnType=== 'text' || column.columnType=== 'email' || column.columnType=== 'link'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <TextField variant='standard' onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}  />
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'checkbox'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <Checkbox  onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.checked
                                                            return copyObj
                                                        })
                                                    }} checked={newPocketedJobValues.jobColumns[index].value} />
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'color'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <input type='color' onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}></input>
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'date'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <TextField 
                                                    variant='standard'
                                                    type='date'
                                                    onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}
                                                    />
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'file'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                        <p>placeholder</p>
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'number'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <TextField variant='standard' type='number' onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}/>
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'phone number'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <TextField 
                                                    
                                                    variant='standard'
                                                    type='tel'
                                                    onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}
                                                    />
                                                </td>
                                            )
                                        }else{
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <TextField 
                                                    
                                                    variant='standard'
                                                    type=''
                                                    onChange={(e)=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj = {...previous}
                                                            copyObj.jobColumns[index].value = e.target.value
                                                            return copyObj
                                                        })
                                                    }} value={newPocketedJobValues.jobColumns[index].value}
                                                    />
                                                </td>
                                            )

                                        }
                                        
                                    })
                                }
                                <td>
                                    {newPocketedJobValues.rejected ? <p 
                                    onClick={()=>{
                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                            let copyObj = {...previous}
                                            copyObj.rejected = !copyObj.rejected
                                            return copyObj
                                        })
                                    }}
                                    style={{color: 'red', cursor: 'pointer'}}>Yes</p> : <p 
                                    onClick={()=>{
                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                            let copyObj = {...previous}
                                            copyObj.rejected = !copyObj.rejected
                                            return copyObj
                                        })
                                    }}
                                    style={{color: "green", cursor: 'pointer'}}>No</p>}
                                </td>
                                <td>
                                {newPocketedJobValues.offerMade ? <p 
                                 onClick={()=>{
                                    setNewPocketedJobValues((previous: PocketedJob)=>{
                                        let copyObj = {...previous}
                                        copyObj.offerMade = !copyObj.offerMade
                                        return copyObj
                                    })
                                }}
                                style={{color: 'green', cursor: 'pointer'}}>Yes</p> : <p 
                                onClick={()=>{
                                    setNewPocketedJobValues((previous: PocketedJob)=>{
                                        let copyObj = {...previous}
                                        copyObj.offerMade = !copyObj.offerMade
                                        return copyObj
                                    })
                                }}
                                style={{color: "red", cursor: 'pointer'}}>No</p>}
                                </td>
                            </tr>
                        </table>
                        </div>
                        
                        

                    </GlassCard>
                    <GlassCard className='pocketedJobsColumnCard'>
                        <div className='headerAndIconDiv'>
                            <h3>Notes</h3>
                            <Button
                            
                            
                            onClick={()=>{
                                
                                setNoteModalContents(
                                <CreateNewNote setNoteModalOpen={setNoteModalOpen} setModalChildren={setNoteModalContents} setNewPocketedJobValues={setNewPocketedJobValues} mode={mode}/>
                                )
                                setNoteModalOpen(true)
                            }}
                            >
                                
                                Create a New Note
                            </Button>
                            {/* <IconButton sx={{color: mode=== 'light' ? 'black' : 'white'}}>
                                <TuneIcon sx={{color: mode=== 'light' ? 'black' : 'white'}}/>  
                            </IconButton> */}
                        </div>
                        <hr />
                        <div className='jobDataAndNotesInnerDiv'>
                            {
                                newPocketedJobValues.notes.map((note: Note, index: number)=>{
                                    return(
                                        <div 
                                            key={`note job page ${index}`}
                                            className={`note ${mode === 'light' ? 'blackNoteBackgroundColor' : 'blackNoteBackgroundColor'}`}>
                                                <div className='xButtonMappedOutNoteDiv'>
                                                    <IconButton
                                                    className='exitButtonFunctionIdentification'
                                                    onClick={()=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            const index = newPocketedJobValues.notes.findIndex((value: Note)=>{
                                                                return note === value
                                                            })
                                                            if(index > -1){
                                                               let copyObj= {...previous}
                                                            
                                                            copyObj.notes.splice(index, 1)
                                                            return copyObj 
                                                            }else{
                                                                return previous
                                                            }
                                                            

                                                        })
                                                    }}
                                                    sx={{
                                                        color: 'red'
                                                    }}>
                                                        <ClearIcon className='exitButtonFunctionIdentification'/>
                                                    </IconButton>
                                                </div>
                                                <h3
                                                onClick={(e: any)=>{
                                                    for(let classList of e.target.classList){
                                                        if(classList === 'exitButtonFunctionIdentification'){
                                                            return
                                                        }
                                                    }
                                                    setNoteModalContents(
                                                        <div>
                                                            <h1>{note.title}</h1>
                                                            <p>{note.description}</p>
                                                        </div>
                                                    )
                                                    setNoteModalOpen(true)
                                                }}
                                                >{note.title}</h3>
                                        </div>
                                    )
                                })
                            }
                            
                            
                        


                        </div>
                       
                        
                        
                        
                    </GlassCard>
                </div>
                <GlassCard className='pocketedJbTodoDiv'>
                <div className='headerAndIconDiv'>
                            <h3>Steps</h3>
                            <IconButton
                            onClick={()=>{
                                setModalOpen(true)
                                setModalChildren(<EditStepsDiv setActiveStep={setActiveStep} newPocketedJobValues={newPocketedJobValues} setNewPocketedJobValues={setNewPocketedJobValues} steps={newPocketedJobValues.steps} />)
                            }}
                            >
                            <TuneIcon />  
                            </IconButton>
                        </div>
                        
                        <div className='stepperMenu'>
                        {newPocketedJobValues.steps.length < 1 ? 
                        <div className='noStepsDynamicDiv'>
                            <h3>You Currently Do Not Have Any Next Steps For This Pocketed Job</h3>
                            <Button 
                            
                            variant='contained'
                            onClick={()=>{
                                setModalOpen(true)
                                setModalChildren(<EditStepsDiv setActiveStep={setActiveStep} newPocketedJobValues={newPocketedJobValues} setNewPocketedJobValues={setNewPocketedJobValues} steps={newPocketedJobValues.steps} />)
                            }}
                            >Create A Step</Button>
                        </div> : <></>}
                        <Stepper 
                        activeStep={activeStep} orientation='vertical'>
                            {
                                newPocketedJobValues.steps.map((step: aStep, index)=>{
                                    return(
                                        <Step completed={step.completed}  key={`${step.id} step`}>
                                            <StepLabel>
                                                {step.name}
                                            </StepLabel>
                                            <StepContent>
                                                {step.stepDescription}
                                                {
                                                    step.dueDate ?
                                                    <div>
                                                        <h3>Due: {returnDateString(step.dueDate)}</h3>

                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </StepContent>
                                        </Step>
                                    )
                                })
                            }

                        </Stepper>

                        </div>
                        
                        <div className='stepStateControlButtonsDiv'>
                        {
                            newPocketedJobValues.steps.length > 0 ?
                            <ButtonGroup size='small' variant='contained'
                            
                            >

                                                
                                                {
                                                    activeStep < 1 ? <></> : <Button onClick={()=> setActiveStep(previous=> previous - 1)}> 
                                                        <ArrowBackIosNewIcon />
                                                    </Button>
                                                }
                
                                                <Button
                                                
                                                onClick={()=>{
                                                    setCompletedStepValue(newPocketedJobValues.steps[activeStep].completed? false : true, activeStep)
                                                }}
                                                >
                                                    {newPocketedJobValues.steps[activeStep].completed? 'Set Step As Incomplete' : 'Set Step As Completed'}
                                                </Button>

                                                {
                                                    activeStep < newPocketedJobValues.steps.length -1 ?
                                                    <Button 
                                                    
                                                    onClick={()=>{
                                                        setActiveStep(previous=> previous + 1)
                                                    }} >
                                                        <NavigateNextIcon />
                                                    </Button>
                                                    :
                                                    <></>
                                                }
                                </ButtonGroup>

                                :
                                <></>
                        }
                        
                                </div>
                </GlassCard>

            </div>
        </div>
        </ThemeProvider>
        </div>
    )

}