'use client'
import '@/styles/auth/signin.css'
import TextField from '@mui/material/TextField';
import SignInComp from "@/components/SignInComp"
import AuthForm from '@/components/AuthForm';

interface SignInProps{

}

export default function SignIn({

}:SignInProps){

    return (
        <div className="test">

           <AuthForm mode={'sign in'} switchBetweenLoginAndSignUp/>

        </div>
    )

}