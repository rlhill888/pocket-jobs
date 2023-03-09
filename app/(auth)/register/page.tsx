'use client'
import AuthForm from "@/components/AuthForm";
import SignUpComp from "@/components/SignUpComp";
import "@/styles/auth/register.css"

interface registerProps
{

}

export default function Register({

}:registerProps){

    return (
        <div className="signUpDiv">

            <AuthForm mode={'sign up'} switchBetweenLoginAndSignUp/>
        </div>
    )

}