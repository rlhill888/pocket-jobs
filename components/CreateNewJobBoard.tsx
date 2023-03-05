import React, { useState } from 'react';
import "@/styles/components.css/CreateNewJobBoard.css";
import { Button, TextField } from '@mui/material';
import CreateNewJobBoardTable from './CreateNewJobBoardTable';
import { ExtraJobColumn } from '@/lib/database';
import { gradientButton1 } from '@/styles/materialUiStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface CreateNewJobBoardProps
{
    
}

export default function CreateNewJobBoard({

}:CreateNewJobBoardProps){

    const [extraJobColumnsArray, setExtraJobColumnsArray]: [ExtraJobColumn[], Function ]= useState([])
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")

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
                <Button color='secondary' disabled={checkDisabled()} variant='contained'  sx={{marginTop: '20px', width: "100%"}}>
                    Create New Job Board
                </Button>
                
            </div>
        </div>
    )

}