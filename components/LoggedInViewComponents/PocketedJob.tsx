'use client'
import React, { useEffect, useRef, useState } from 'react';
import "@/styles/loggedInUserView/PocketedJob.css"
import GlassCard from '../GlassCard';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TuneIcon from '@mui/icons-material/Tune';
import { darkenRGBValue, getFirstRGBValue, lightenRGBValue, convertColorToRGB } from '@/lib/theme';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import Loading from '../Loading';
import axios from 'axios';
import { queryIdFromUrl } from '@/lib/routing';
import { JobColumn, Note, PocketedJob } from '@/lib/database';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ClearIcon from '@mui/icons-material/Clear';
import { height } from '@mui/system';
import CreateNewNote from '../CreateNewNote';
import NoteModalDiv from '../NoteModalDiv';


interface PocketedJobProps
{
    
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
   const [modalWidthAndHeight, setModalWidthAndHeight]: [{width: string | null, height: string | null}, Function]= useState({
       width: null,
       height: null
   })
   const exitButton = useRef("Exit button")
   function refreshUserData(){
       setRefreshUserData(previous=> previous+1)
   }
   console.log(newPocketedJobValues)
   useEffect(()=>{
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
           
   }, [refreshUserDataState])
   function hasDuplicates(arr: any[]) {
    let unique = {};
    for (let i = 0; i < arr.length; i++) {
      if (unique.hasOwnProperty(JSON.stringify(arr[i]))) {
        return true;
      } else {
        unique[JSON.stringify(arr[i])] = true; 
      }
    }
    return false;
  }
  function removeDuplicates(arr: any[]) {
    let unique = {};
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
   if(color){
    
     darkenedColor = darkenRGBValue(color)
    lightenedColor = lightenRGBValue(color)
    console.log(color)

    
   }
   if(!color || !user || !thePocketedJob && triedFetchingUser){
    // handle functionality to re route users
    return <Loading loadingTitle='Loading Pocketed Job'/>
   }
   if(!color || !user || !thePocketedJob){
    return <Loading loadingTitle='Loading Pocketed Job'/>
   }
    return (
        <div style={{
            backgroundImage: `linear-gradient( 109.6deg,  ${darkenedColor} 11.2%, ${lightenedColor} 71.1% )`
        }} className='mainPocketJobDiv'>

        {
            noteModalOpen ?

            <div className='dragableNoteModalDiv'>
            <NoteModalDiv setNoteModalOpen={setNoteModalOpen} mode={mode} noteModalContents={noteModalContents}/>
            </div>
           
            :
            <></>


        }
        
        
        <div className={`otherMainPocketedJobsDiv ${getFirstRGBValue(color) <= 127.5 ? "pocketedJobLightColor" : "pocketedJobDarkColor"}`}>
            <GlassCard className='pocketedJobsTitleDiv'>
                <div className='titleAndIconDiv'>
                    <DataUsageIcon sx={{color: mode=== 'light' ? 'black' : 'white', marginRight: "10px"}}/>
                    <h1 className='pocketedJobTitle'>
                        {thePocketedJob.jobPositionName} at {thePocketedJob.companyName}
                    </h1>
                    

                </div>
                <IconButton
                color={mode === 'light' ? 'fourth' as any : 'tertiary' as any}
                disabled={ initialPocketedJobValues === newPocketedJobValues ? true: false}
                
                > 
                    <SaveIcon />
                </IconButton>
                
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
                                    }} value={newPocketedJobValues.salary} variant='standard' color={'tertiary' as any}></TextField>
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
                                                    }} value={newPocketedJobValues.jobColumns[index].value} color={'tertiary' as any} />
                                                </td>
                                            )
                                        }
                                        if(column.columnType=== 'checkbox'){
                                            return(
                                                <td key={`extra column td input ${index} ${column.columnName}`}>
                                                    <Checkbox color={'tertiary' as any} onChange={(e)=>{
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
                                                    color={'tertiary' as any}
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
                                                    color={'tertiary' as any}
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
                                                    color={'tertiary' as any}
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
                            color={mode === 'light' ? 'fourth' as any : 'tertiary' as any}
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
                                            className={`note ${mode === 'light' ? 'blackNoteBackgroundColor' : 'whiteNoteBackgroundColor'}`}>
                                                <div className='xButtonMappedOutNoteDiv'>
                                                    <IconButton
                                                    className='exitButtonFunctionIdentification'
                                                    onClick={()=>{
                                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                                            let copyObj= {...previous}
                                                            
                                                            copyObj.notes.splice(index, 1)
                                                            return copyObj

                                                        })
                                                    }}
                                                    sx={{
                                                        color: 'red'
                                                    }}>
                                                        <ClearIcon className='exitButtonFunctionIdentification'/>
                                                    </IconButton>
                                                </div>
                                                <h3>{note.title}</h3>
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
                            <IconButton sx={{color: mode=== 'light' ? 'black' : 'white'}}>
                            <TuneIcon sx={{color: mode=== 'light' ? 'black' : 'white'}}/>  
                            </IconButton>
                            

                        </div>

                </GlassCard>

            </div>
        </div>
        </div>
    )

}