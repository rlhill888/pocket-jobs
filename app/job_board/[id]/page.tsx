'use client'
import JobBoardPage from '@/components/LoggedInViewComponents/JobBoardPage';
import React, { useEffect } from 'react';
import "@/styles/loggedInUserView/jobBoardPage.css"

interface pageProps
{
    
}

export default function page({

}:pageProps){

    return (
        <div className='mainJobBoardDiv'>
            <JobBoardPage name='Test Job Board'/>
        </div>
    )

}