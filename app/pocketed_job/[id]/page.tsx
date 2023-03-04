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
    const color = "rgb(100, 0, 0)"
    const darkenedColor = darkenRGBValue(color)
    const lightenedColor = lightenRGBValue(color)

    return (
        <div style={{
            backgroundImage: `linear-gradient( 109.6deg,  ${lightenedColor} 11.2%, ${darkenedColor} 71.1% );`
        }} className='mainPocketJobDiv'>
            <PocketedJob color={color}></PocketedJob>
            
        </div>
    )

}