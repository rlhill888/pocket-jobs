import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signin } from "@/lib/api";

interface SignInProps
{
    SwitchBetweenSignUp?: Boolean;
    setCurrentMode?: Function;
    doNotRedirectWhenFormIsCompleted?: Boolean;
    
}

export default function SignInComp({
    SwitchBetweenSignUp,
    setCurrentMode,
    doNotRedirectWhenFormIsCompleted,
}:SignInProps){
    const [userName, setUserName]= useState("")
    const [password, setPassword]= useState("")
    const [loading, setLoading]= useState(false)

    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                setLoading(true)
                try{
                    const response = signin({
                        password: password,
                        userName: userName
                    })

                if(!doNotRedirectWhenFormIsCompleted){
                    // redirect function goes here
                }

                }catch(error: any){
                    console.log(error.response.data.error)
                    setLoading(false)
                }
               
            }}>
                <h3>User Name</h3>
                <TextField value={userName} onChange={(e)=> setUserName(e.target.value)} variant='standard'></TextField>
                <h3>Password</h3>
                <TextField value={password} onChange={(e)=> setPassword(e.target.value)} variant='standard'></TextField>
                <br />
                <br />
                <Button disabled={loading} variant='contained' type="submit">{loading ? <CircularProgress /> : 'Sign In'} </Button>
                {SwitchBetweenSignUp && setCurrentMode ? 
                <div>
                    <h2>Do not have an account?</h2>
                    <Button onClick={()=> setCurrentMode('sign up')}>Sign up</Button>
                </div>
                :
                <></>
                }
            </form>
        </div>
    )

}