import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signin } from "@/lib/api";
import { useRouter } from 'next/navigation';
import '@/styles/components.css/SignInComp.css'

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
    const router = useRouter()

    

    return (
        <div className='innerSignInDiv'>
            <h1 className='signInHeader'>SignIn</h1>
            <form className='form' onSubmit={async (e)=>{
                e.preventDefault()
                setLoading(true)
                try{
                    const response = await signin({
                        password: password,
                        userName: userName
                    })

                if(!doNotRedirectWhenFormIsCompleted){
                    router.push('/')
                   
                }

                }catch(error: any){
                    console.log(error.response.data.error)
                    setLoading(false)
                }
               
            }}>
                <h3>User Name</h3>
                <TextField
                style={{
                    marginBottom: "15%"
                }}
                fullWidth className='textField' value={userName} onChange={(e)=> setUserName(e.target.value)} variant='standard'></TextField>
                <h3>Password</h3>
                <TextField 
                 style={{
                    marginBottom: "15%"
                }}
                fullWidth className='textField' value={password} onChange={(e)=> setPassword(e.target.value)} variant='standard'></TextField>
                <br />
                <br />
                <Button fullWidth disabled={loading} variant='contained' type="submit">{loading ? <CircularProgress /> : 'Sign In'} </Button>
                {SwitchBetweenSignUp && setCurrentMode && !loading ? 
                <div className='signUpDiv'>
                    <h2 className='doNotHaveAnAccountHeader'>Do not have an account?</h2>
                    <Button disabled={loading}  className='submitButton' onClick={()=> setCurrentMode('sign up')}>Sign up</Button>
                </div>
                :
                <></>
                }
            </form>
        </div>
    )

}