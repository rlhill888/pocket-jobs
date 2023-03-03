'use client'
import AuthForm from "@/components/AuthForm";
import SignUpComp from "@/components/SignUpComp";

interface registerProps
{

}

export default function Register({

}:registerProps){

    return (
        <div className="register">

            <AuthForm mode={'sign up'} />
        </div>
    )

}