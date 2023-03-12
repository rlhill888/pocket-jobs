import React, { use, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { register } from "@/lib/api";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "@/styles/components.css/SignUpComp.css"
import { CircularProgress } from '@mui/material';

interface SignUpProps
{
    SwitchBetweenLogin?: Boolean;
    setCurrentMode?: Function;
    doNotRedirectWhenFormIsCompleted?: Boolean;
    setErrors: Function;
}

export default function SignUpComp({
    SwitchBetweenLogin,
    setCurrentMode,
    doNotRedirectWhenFormIsCompleted,
    setErrors

}:SignUpProps){
    const router = useRouter()
    const [firstName, setFirstName]= useState("")
    const [lastName, setLastName]= useState("")
    const [userName, setUserName]= useState("")
    const [password, setPassword]= useState("")

    const [loading, setLoading]= useState(false)

    const [showPassword, setShowPassword]= useState(false)
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
              
                console.log(response.data)
                router.push('/')
            
              }catch(error){
                console.log(error)
              }  
           }
           fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputSx = {
        
    }

    return (
        <div className='signUpCompDiv'>
            <h1 className='signUpHeader'>Sign Up</h1>

            <form
            onSubmit={ async (e)=>{
                e.preventDefault()
                setLoading(true)
                try{
                     const response = await register({
                        password,
                        firstName,
                        LastName: lastName,
                        userName
                    })
                    console.log(response)
                    if(!doNotRedirectWhenFormIsCompleted){
                      router.push('/')
                      setTimeout(()=> window.location.reload(), 1000)
                    }
                }catch(error){
                    
                    if((error as any).response.data.error.code === 'P2002'){
                        setErrors([`Username ${userName} has already been taken. Input a different one.`])

                    }
                    console.log(error)
                    setLoading(false)
                }

            }}
            >

                <div className='firstNameAndLastNameDiv'>
                    <TextField disabled={loading} fullWidth label='First Name' value={firstName} onChange={(e)=>  setFirstName(e.target.value)} variant='outlined'></TextField>
                    <TextField disabled={loading} fullWidth label='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)} variant='outlined'></TextField>
                </div>
                

                <h3>User Name</h3>
                <TextField sx={{
                    marginBottom: '10%'
                }} 
                disabled={loading}
                value={userName} onChange={(e)=> setUserName(e.target.value)} variant='outlined'></TextField>

                <h3>Password</h3>
                <TextField 
                disabled={loading}
                sx={{
                    marginBottom: '10%'
                }} 
                type={!showPassword? 'password': ''} value={password} onChange={(e)=> setPassword(e.target.value)} variant='outlined'></TextField> <p>Show Password <Checkbox onChange={(e)=> setShowPassword(e.target.checked)} checked={showPassword}></Checkbox> </p>
                <br />
                <Button 
                sx={{
                    marginBottom: '10%'
                }}
                variant='contained' disabled={ firstName.trim() === '' || lastName.trim() === '' || userName.trim() === '' || password.trim() === '' || loading ? true: false } fullWidth type='submit'>
                    
                    {loading ? 
                    <CircularProgress />
                    :
                    "Sign Up!"
                    }
                    
                    </Button>
                {SwitchBetweenLogin && setCurrentMode ? 
                <div
                className='haveAnAccountDiv'
                >
                    <h2>Have an account?</h2>
                    <Button onClick={()=> setCurrentMode('sign in')}>Log in</Button>
                </div>

                :
                <></>
                }
                
            </form>
            


        </div>
    )

}