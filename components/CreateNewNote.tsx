import { PocketedJob } from '@/lib/database';
import { Button, TextField } from '@mui/material';

import React, { useState } from 'react';

interface createNewNoteProps
{
    mode: 'light' | 'dark' | null;
    setNewPocketedJobValues: Function;
    setModalChildren: Function;
    setNoteModalOpen: Function;
}

export default function CreateNewNote({
    mode,
    setNewPocketedJobValues,
    setModalChildren,
    setNoteModalOpen
}:createNewNoteProps){
    
    const [newNoteTitle, setNewNoteTitle]= useState("")
    const [newNNoteDescription, setNewNoteDescription]= useState("")
    
    return (
        <div>
             <TextField 
                                    key={`create note title`}
                                    inputProps={{
                                        style: {
                                            color: 'white'
                                        }
                                    }}
                                    value={newNoteTitle}
                                    onChange={(e)=> setNewNoteTitle(e.target.value)}
                                     label='New Note Title' fullWidth variant='standard' />
                                    <TextField
                                    key={`create note desc`}
                                    value={newNNoteDescription}
                                    onChange={(e)=> setNewNoteDescription(e.target.value)}
                                    sx={{marginTop: '20px', 
                                    }} inputProps={{
                                        style: {
                                            position: 'relative',
                                            height: '25vh',
                                            color: 'white',
                                            textOverflow: "ellipsis", overflow: "hidden"
                                        }
                                    }}  label='New Note Description' fullWidth />
                                    <Button
                                    onClick={(e)=>{
                                        if(e.detail == 2){
                                            return
                                        }
                                        setNewPocketedJobValues((previous: PocketedJob)=>{
                                            const newNote = {
                                                title: newNoteTitle,
                                                description: newNNoteDescription
                                            }
                                            for(let note of previous.notes){
                                                
                                                if(newNote=== note){
                                                    return previous
                                                }
                                            }
                                            let copyObj = {...previous}
                                            copyObj.notes.push({
                                                title: newNoteTitle,
                                                description: newNNoteDescription
                                            })

                                            return copyObj
                                        })
                                        setNewNoteDescription("")
                                        setNewNoteTitle("")
                                        setModalChildren(<></>)
                                        setNoteModalOpen(false)

                                    }}
                                    disabled={ newNNoteDescription.trim() === "" || newNoteTitle.trim() === "" ? true : false}
                                    
                                    >Create New Note</Button>
        </div>
    )

}