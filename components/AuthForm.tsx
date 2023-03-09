import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import SignInComp from './SignInComp';
import SignUpComp from './SignUpComp';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

interface AuthFormProps
{
    mode: 'sign in' | 'sign up';
    switchBetweenLoginAndSignUp?: Boolean;
    doNotRedirectWhenFormIsCompleted?: Boolean;
}

export default function AuthForm({
    mode,
    switchBetweenLoginAndSignUp,
    doNotRedirectWhenFormIsCompleted
}:AuthFormProps){
   const [loading, setLoading]= useState(true)
   const router = useRouter()
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
             
             if(response.data){
                router.push('/')
             }
           }catch(error){
                setLoading(false)
           }  
        }
        fetchUser()
             
     }, [])
    const [currentMode, setCurrentMode]= useState(mode)
    if(loading){
       return (<div
       style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
       }}
       >
        <CircularProgress color='secondary' size={80}/>
       </div>)
    }

    if(currentMode==='sign in'){
        return(
            <SignInComp setCurrentMode={setCurrentMode} SwitchBetweenSignUp={switchBetweenLoginAndSignUp} doNotRedirectWhenFormIsCompleted={doNotRedirectWhenFormIsCompleted}/>
        )
    }

    if(currentMode==='sign up'){
        return(
            <SignUpComp setCurrentMode={setCurrentMode} SwitchBetweenLogin={switchBetweenLoginAndSignUp} doNotRedirectWhenFormIsCompleted={doNotRedirectWhenFormIsCompleted}/>
        )
    }


    return (
        <div>
            
        </div>
    )

}