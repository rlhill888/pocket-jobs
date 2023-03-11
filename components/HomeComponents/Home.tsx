'use-client'
import React, { useEffect, useState } from 'react';
import { cookies } from "next/headers";
import axios from 'axios';
import { grabUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import LoggedInUserView from './LoggedInUserView';
import WelcomeAndAboutView from './WelcomeAndAboutView';
import Loading from '../Loading';
import { User } from '@/lib/user';


interface HomeProps
{
    
}

export default function Home({

}:HomeProps){
    const [user, setUser]: [User | null, Function]= useState(null)
    const [triedFetchingUser, setTriedFetchingUser]= useState(false)
    const [refreshUserDataState, setRefreshUserData]= useState(0)
    const router = useRouter()

    function refreshUserData(){
        setRefreshUserData(previous=> previous+1)
    }
    useEffect(()=>{
       async function fetchUser(){
        try{

            const response = await axios({
                url: '/api/me',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  }
            })
            setUser(response.data)
            console.log(response.data)
            setTriedFetchingUser(true)
        
          }catch(error){
            setTriedFetchingUser(true)
          }  
       }
       fetchUser()
            
    }, [refreshUserDataState])

    if(user){
        return <LoggedInUserView refreshUserData={refreshUserData}  user={user}></LoggedInUserView>
    }
    if(!user && !triedFetchingUser){
        return <Loading></Loading>
    }

    return (
        <div>
            <WelcomeAndAboutView />
        </div>
    )

}