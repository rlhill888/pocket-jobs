'use client'
import '@/styles/auth/signin.css';
import AuthForm from '@/components/AuthForm';

interface SignInProps{

}

export default function SignIn({

}:SignInProps){

    return (
        <div className="signInDiv">

           <AuthForm mode={'sign in'} switchBetweenLoginAndSignUp/>

        </div>
    )

}