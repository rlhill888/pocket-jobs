import { defaultColumns } from '@/lib/database';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import "@/styles/components.css/PocketAJob.css"

interface PocketAJobProps
{
    jobBoard: any;
}

export default function PocketAJob({
    jobBoard
}:PocketAJobProps){
const extraColumns = JSON.parse(jobBoard.extraJobColumns)
const [values, setValues]= useState(declareInitialValuesState())
function declareInitialValuesState(){
    const allValues = [...defaultColumns, ...extraColumns]

    let newValueArray = []

    for(let column of allValues){
        if(column.columnType === 'text'){
            newValueArray.push({
                columnName: column.columnName,
                value: ""
            })
        }
        if(column.columnType === 'number'){
            newValueArray.push({
                columnName: column.columnName,
                value: null
            })
        }
        if(column.columnType === 'checkbox'){
            newValueArray.push({
                columnName: column.columnName,
                value: false
            })
        }
        if(column.columnType === 'date'){
            newValueArray.push({
                columnName: column.columnName,
                value: null
            })
        }
        if(column.columnType === 'link'){
            newValueArray.push({
                columnName: column.columnName,
                value: ""
            })
        }
        if(column.columnType === 'file'){
            newValueArray.push({
                columnName: column.columnName,
                value: null
            })
        }
        if(column.columnType === 'phone number'){
            newValueArray.push({
                columnName: column.columnName,
                value: ""
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
                value: "#FFFFFF"
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
                        <TextField sx={{width: "100%"}} className='pocketedJobInputDiv' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
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

                        <TextField sx={{width: "100%"}} label={column.columnName} placeholder={`${column.columnName} Number`} type='number'  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'checkbox'){
                    return(
                       <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnName}`}>
                        <h3>{column.columnName}</h3>
                        <Checkbox  checked={values[index].value as boolean} onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.checked
                        return copyArray
                    })}/>
                        </div>
                    )
                }
                if(column.columnType === 'date'){
                    return( 
                    <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnName}`}>
                        <h3>{column.columnName}</h3>
                        <TextField sx={{width: "100%"}}    type='date'  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
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
                        <TextField sx={{width: "100%"}} label={column.columnName} placeholder={column.columnType}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                            let copyArray = [...previous]
                            copyArray[index].value = e.target.value
                            return copyArray
                        })}/>
                    </div>
                    )
                }
                if(column.columnType === 'file'){
                    return <p key={`placeholder file ${index}`}>placeholder file input</p>
                }
                if(column.columnType === 'phone number'){
                    return(
                        <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnType}`}>
                        <TextField sx={{width: "100%"}} type='tel' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
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
                    <TextField sx={{width: "100%"}} type='email' label={column.columnName} placeholder={column.columnName}  value={values[index].value} onChange={(e)=> setValues((previous: any)=>{
                        let copyArray = [...previous]
                        copyArray[index].value = e.target.value
                        return copyArray
                    })}/>
                    </div>
                    )
                }
                if(column.columnType === 'color'){
                    return( 
                    <div className='pocketedJobInputDiv' key={`pocketed job input ${index} ${column.columnName}`}>
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



    return (
        <div>
            <h2>Pocket a Job</h2>
            <div className='pocketAJobInputGrid'>
                {mapOutInputs()}
            </div>
            <hr className='pocketAJobH'/>
            <div>

            </div>
            
        </div>
    )

}