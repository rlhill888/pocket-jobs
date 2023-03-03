import React, { useState } from 'react';
import SignInComp from './SignInComp';
import SignUpComp from './SignUpComp';

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
    const [currentMode, setCurrentMode]= useState(mode)
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