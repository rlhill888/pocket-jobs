'use client'
import Accountcomponent from '@/components/Accountcomponent';
import React from 'react';
import "@/styles/loggedInUserView/Account.css";

interface pageProps
{
    
}

export default function page({

}:pageProps){

    return (
        <div className='mainAccountDiv'>
            <Accountcomponent />
        </div>
    )

}