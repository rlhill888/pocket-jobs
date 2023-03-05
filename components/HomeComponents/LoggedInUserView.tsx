import { User } from '@/lib/user';
import React from 'react';
import GlassCard from '../GlassCard';
import MainPage from '../LoggedInViewComponents/MainPage';

interface LoggedInUserViewProps
{
    user: User;
    refreshUserData: Function
}

export default function LoggedInUserView({
    user,
    refreshUserData
}:LoggedInUserViewProps){

    return (
        <div>
            <MainPage refreshUserData={refreshUserData} user={user}/>
        </div>
    )

}