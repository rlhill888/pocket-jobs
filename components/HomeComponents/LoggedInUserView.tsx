import { User } from '@/lib/user';
import React from 'react';
import GlassCard from '../GlassCard';
import MainPage from '../LoggedInViewComponents/MainPage';

interface LoggedInUserViewProps
{
    user: User;
}

export default function LoggedInUserView({
    user
}:LoggedInUserViewProps){

    return (
        <div>
            <MainPage user={user}/>
        </div>
    )

}