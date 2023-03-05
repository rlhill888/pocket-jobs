import React, { useState } from 'react';
import "@/styles/components.css/CreateNewJobBoard.css";
import { Button, TextField } from '@mui/material';
import CreateNewJobBoardTable from './CreateNewJobBoardTable';
import { ExtraJobColumn, headers } from '@/lib/database';
import { gradientButton1 } from '@/styles/materialUiStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { userAgent } from 'next/server';
import { User } from '@/lib/user';

interface CreateNewJobBoardProps
{
    user: User;
    refreshUserData: Function;
    setModalOpen: Function;
}

export default function CreateNewJobBoard({
        user,
        refreshUserData,
        setModalOpen
}:CreateNewJobBoardProps){

    const [extraJobColumnsArray, setExtraJobColumnsArray]: [ExtraJobColumn[], Function ]= useState([])
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")
    const [loading, setLoading]= useState(false)

    function checkDisabled(){
        for(const column of extraJobColumnsArray){
            if(column.columnName.trim() === "" || column.columnType === null){
                return true
            }
        }
        if(name.trim()=== "" || description.trim()=== ""){
            return true
        }else{
            return false
        }
    }
    async function createNewJobBoard(){
        setLoading(true)
        try{

            const response = await axios({
                url: "/api/job_board/create_job_board",
                headers: headers,
                method: "POST",
                data: {
                    name: name,
                    description: description,
                    defaultJobColumns: extraJobColumnsArray,
                    userId: user.id
                }
            })
            console.log(response)
            refreshUserData()
            setModalOpen(false)

        }catch(error){
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className='createNewJobBoardDiv'>
            <h2 className='createNewJobTitle'>Create A New Job Board</h2>
            <hr className='createNewJobBoardHr'/>
            <div className='jobBoardFormInputs'>
                <div className='createNewJobBoardFlexDiv'>
                <TextField value={name} onChange={(e)=> setName(e.target.value)} sx={{ marginRight: "5px", width: "50%"}} label="Name" variant='outlined' placeholder='Job Board Name'/>
                <TextField value={description} onChange={(e)=> setDescription(e.target.value)} sx={{marginLeft: "5px", width: "50%"}} label="Description" variant='outlined' placeholder='Job Board Description'/>
                </div>
                <hr className='createNewJobBoardHr'/>
                <div className='jobBoardColumnsCreateNewColumn'>
                    <h3>Job Board Columns</h3>
                    <Button color='primary' variant='text'
                    onClick={()=>{
                        setExtraJobColumnsArray((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray.push({
                                columnName: "",
                                columnType: null
                            })
                            return copyArray
                        })
                    }}
                    >
                        <AddCircleOutlineIcon />
                        Add Custom Column</Button>
                </div>
                <hr className='jobBoardColumnsHr'/>
                <div>
                    <CreateNewJobBoardTable extraTablesArray={extraJobColumnsArray} setExtraJobColumnsArray={setExtraJobColumnsArray}/>

                </div>
                <Button onClick={async ()=>  await createNewJobBoard()} color='secondary' disabled={checkDisabled() || loading} variant='contained'  sx={{marginTop: '20px', width: "100%"}}>
                    {
                        loading ? 
                        <>
                        <CircularProgress sx={{margin: '2px'}}/>
                        </>
                        :
                        <h3 className='buttonHeader'>
                            create job board
                        </h3>
                    }
                </Button>
                
            </div>
        </div>
    )

}