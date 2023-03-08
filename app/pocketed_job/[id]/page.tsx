'use client'
import React from 'react';
import "@/styles/loggedInUserView/PocketedJob.css"
import { darkenRGBValue, lightenRGBValue } from '@/lib/theme';
import PocketedJob from '@/components/LoggedInViewComponents/PocketedJob';

interface pageProps
{
    
}

export default function page({
    
}:pageProps){


    return (
        <div>
            <PocketedJob></PocketedJob>
        </div>
            
            
        
    )

}