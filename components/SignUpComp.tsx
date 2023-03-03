import React, { use, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { register } from "@/lib/api";

interface SignUpProps
{
    SwitchBetweenLogin?: Boolean;
    setCurrentMode?: Function;
    doNotRedirectWhenFormIsCompleted?: Boolean;
}

export default function SignUpComp({
    SwitchBetweenLogin,
    setCurrentMode,
    doNotRedirectWhenFormIsCompleted

}:SignUpProps){
    const [firstName, setFirstName]= useState("")
    const [lastName, setLastName]= useState("")
    const [userName, setUserName]= useState("")
    const [password, setPassword]= useState("")

    const [loading, setLoading]= useState(false)

    const [showPassword, setShowPassword]= useState(false)

    return (
        <div>
            <h1>Sign Up</h1>

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
                        //redirect function goes here
                    }
                }catch(error){
                    console.log(error)
                    setLoading(false)
                }

            }}
            >

                <h3>First Name</h3>
                <TextField value={firstName} onChange={(e)=>  setFirstName(e.target.value)} variant='outlined'></TextField>

                <h3>Last Name</h3>
                <TextField value={lastName} onChange={(e)=> setLastName(e.target.value)} variant='outlined'></TextField>

                <h3>User Name</h3>
                <TextField value={userName} onChange={(e)=> setUserName(e.target.value)} variant='outlined'></TextField>

                <h3>Password</h3>
                <TextField type={!showPassword? 'password': ''} value={password} onChange={(e)=> setPassword(e.target.value)} variant='outlined'></TextField> <p>Show Password <Checkbox onChange={(e)=> setShowPassword(e.target.checked)} checked={showPassword}></Checkbox> </p>
                <br />
                <Button type='submit'>Sign Up</Button>
                {SwitchBetweenLogin && setCurrentMode ? 
                <div>
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