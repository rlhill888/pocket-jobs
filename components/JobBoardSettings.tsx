import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import "@/styles/components.css/JobBoardSettings.css"
import { JobBoard } from '@prisma/client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { headers } from '@/lib/database';

interface JobBoardSettingsProps
{
    jobBoard: JobBoard;
    setModalOpen: Function;
    refreshUserData: Function;
}

export default function JobBoardSettings({
    jobBoard,
    setModalOpen,
    refreshUserData,
}:JobBoardSettingsProps){

    const [deleteJobBoardConfirmation, setDeleteJobBoardConfirmation]= useState(false)
    const [updateJobBoard, setUpdateJobBoard]= useState(false)
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [loading, setLoading]= useState(false)

    // if(loading){
    //     return(
    //         <div>
    //             <CircularProgress  color='secondary'/>

    //         </div>
    //     )
    // }
    if(updateJobBoard){
        return(
            <div className='updateJobBoardMenu'>
                <h3>Update {jobBoard.name}</h3>
                <Button onClick={()=> setUpdateJobBoard(false)} className='backJobBoardSettingsButton settingsButton'> 
                    <KeyboardBackspaceIcon />
                    Back</Button>
                <TextField value={name} onChange={(e)=> setName(e.target.value)} className='settingsTextField' label='Name' placeholder={jobBoard.name}></TextField>
                <TextField value={description} onChange={(e)=> setDescription(e.target.value)} className='settingsTextField' label='Description' placeholder={jobBoard.description}></TextField>

                <Button 
                onClick={async ()=>{
                    setLoading(true)
                    try{
                        const response = await axios({
                            url: '/api/job_board/update_job_board',
                            headers: headers,
                            method: 'PATCH',
                            data: {
                                name: name,
                                description: description,
                                jobBoardId: jobBoard.id
                            }
                        })
                        console.log(response)
                        refreshUserData()
                        setModalOpen(false)
                        
                    }catch(error){
                        console.log(error)
                    }
                    setLoading(false)
                }}
                disabled={name.trim()=== '' || description.trim() === '' || loading} variant='contained'>{loading ? <CircularProgress /> : 'Update Job Board'}</Button>
            </div>
        )
    }
    if(deleteJobBoardConfirmation){
        return(
            <div>
                <h3>Are You Sure You Want To Delete This Job Board?</h3>
                {loading ? 
                <div>
                    <CircularProgress />
                </div>
                :
                <></>
                }
                <ButtonGroup disabled={loading}>
                    <Button
                    onClick={async ()=>{
                        setLoading(true)
                        try{
                            const response = await axios({
                                url: '/api/job_board/delete_job_board',
                                method: 'PATCH',
                                data: {
                                    jobBoardId: jobBoard.id
                                }
                            })
                            console.log(response)
                            refreshUserData()
                            setModalOpen(false)
                        }catch(error){
                            console.log(error)
                        }
                        setLoading(false)
                    }}
                    > Yes</Button>
                    <Button
                    onClick={()=>{
                        setDeleteJobBoardConfirmation(false)
                    }}
                    >No</Button>
                </ButtonGroup>

            </div>
        )
    }
    return (
        <div className='defaultMenu'>
            <h3>{jobBoard.name} Settings</h3>
            <Button
            className='settingsButton'
            onClick={()=>{
                setDeleteJobBoardConfirmation(true)
            }}
            >Delete Job Board</Button>
            <Button
            className='settingsButton'
            onClick={()=>{
                setUpdateJobBoard(true)
            }}
            >Update Job Board</Button>
        </div>
    )

}