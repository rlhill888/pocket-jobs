import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "@/styles/components.css/Errors.css"

interface ErrorsProps
{
    errors: any[];
    setErrors: Function;
}

export default function Errors({
    errors,
    setErrors
}:ErrorsProps){
    const [open, setOpen]= useState(false)

    useEffect(()=>{
        if(errors.length > 0){
            setOpen(true)
        }else{
            setOpen(false)
        }
    }, [errors])

    return (
        <div className='mainErrorsDiv' >
            {errors.map((error, index)=>{
                
                return(
                    <Snackbar sx={{width: '90%', margin: "auto"}} open={ errors.length > 0 ? true : false} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={6000} key={`error stack ${index}`}>
                            <Alert variant='filled' severity='error'>

                                <div className='mainErrorContent'>
                                {error}
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={()=>{ 
                                        setOpen(false)
                                        setErrors((previous: any[])=>{
                                            let copyArray = [...previous]
                                            copyArray.splice(index, 1)
                                            return copyArray
                                        })
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>

                                </div>
                                
                                
                            </Alert>
                    </Snackbar>
                )
            })}
        </div>
    )

}