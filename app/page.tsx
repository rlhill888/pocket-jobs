'use client'
import React from 'react';
import axios from 'axios';
import { getUserFromCookie } from '@/lib/auth';
import { cookies } from "next/headers";
import Home from '@/components/HomeComponents/Home';


interface pageProps
{
    
}

export default function page({

}:pageProps){

      

    return (
        <div>
            
            
            <Home />
        </div>
    )

}