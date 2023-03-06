import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ExtraJobColumn } from '@/lib/database';
import CancelIcon from '@mui/icons-material/Cancel';
import "@/styles/components.css/CreateNewJobBoardTr.css"

interface CreateNewJobBoardTrProps
{
    index: number;
    extraTablesArray: ExtraJobColumn[];
    setExtraJobColumnsArray: Function;
    
}


export default function CreateNewJobBoardTr({
    index,
    extraTablesArray,
    setExtraJobColumnsArray,
}:CreateNewJobBoardTrProps){
    const [inputType, setInputType]= useState(null)
    const [columnName, setColumnName]= useState("")
    
    return (
        <tr>
            <td>
                <div className='deleteButtonAndTextFieldCreateNewJobBoardTr'>
                    <IconButton 
                    color='primary'
                    onClick={()=>{
                        setExtraJobColumnsArray((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray.splice(index, 1)
                            return copyArray
                        })
                    }}
                    >
                        <CancelIcon />
                    </IconButton>

                    <TextField value={extraTablesArray[index].columnName} onChange={(e)=> setExtraJobColumnsArray((previous: any)=>{
                    let copyArray = [...previous] 
                    copyArray[index].columnName = e.target.value
                    return copyArray
                    })} placeholder='Column Name' variant='standard' sx={{margin: "0", width: '100%'}}/>
                </div>
                
            </td>
            <td>
                <Select value={extraTablesArray[index].columnType} onChange={(e: any)=> {
                    setExtraJobColumnsArray((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].columnType = e.target.value
                        return copyArray
                    })
                }} color='primary' variant='standard' sx={{zIndex: "1000000", width: "100%", margin: "0"}}>
                    <MenuItem value={"text"}>Text</MenuItem>
                    <MenuItem value={"number"}>Number</MenuItem>
                    <MenuItem value={"checkbox"}>Check Box</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="link">Link</MenuItem>
                    <MenuItem value="file">File</MenuItem>
                    <MenuItem value="phone number">Telephone Number</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="color">Color</MenuItem>
                </Select>
            </td>
        </tr>
    )

}