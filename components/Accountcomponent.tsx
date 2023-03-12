import React, { useEffect, useState } from 'react';
import "@/styles/loggedInUserView/Account.css"
import GlassCard from './GlassCard';
import { Button } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from './Loading';
import { User } from '@prisma/client';
import ToDoListsDiv from './ToDoListsDiv';
import ModalCard from './ModalCard';

interface AccountcomponentProps
{
    
}

export default function Accountcomponent({

}:AccountcomponentProps){
    const router = useRouter()
    const [user, setUser]: [User | null, Function]= useState(null)
    const [triedFetchingUser, setTriedFetchingUser]= useState(false)
    const [reRender, setReRender]= useState(0)
    const [refreshUserData, setRefreshUserData]= useState(0)
    const [modalOpen, setModalOpen]= useState(false)
    const [modalChildren, setModalChildren]= useState(<></>)
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
             setTriedFetchingUser(true)
         
           }catch(error){
             setTriedFetchingUser(true)
           }  
        }
        fetchUser()
             
     }, [refreshUserData])

     if(!user){
        return(<Loading loadingTitle='Loading Account Page'/>)
     }

    return (
        <div>
         <ModalCard modalOpen={modalOpen} setModalOpen={setModalOpen}>   
            {modalChildren}
        </ModalCard>

        <GlassCard className='mainAccountHeaderDiv'>
            <h1 className='userNameHeader'>{user.userName}</h1>
            <div className='headerNavBarButtons'>
                <Button 
                onClick={()=>{
                    router.push('/')
                }}
                sx={{marginRight: "15px"}} ><KeyboardBackspaceTwoToneIcon />
                    Back To Home
                </Button>

                <Button
                onClick={async()=>{
                    try{
                        const response = await axios({
                            url: '/api/log_out'
                        })
                        console.log(response)
                        router.push('/')
                    }catch(error){
                        console.log(error)
                    }
                }}
                >
                    Log Out
                </Button>

                {/* <Button variant='contained' sx={{...gradientButton1}}>
                    View Metrics
                </Button>
                finish metrics later */}
            </div>
        </GlassCard>
        <div className='otherMainAccountDiv'>
            <GlassCard className='accountInfoDiv'>
                <div className='glassContainerHeaderDiv'>
                <h3>Account Info</h3>
                {/* <IconButton color='primary' >
                            <TuneIcon />  
                </IconButton> */}

                </div>
                <div className='accountInfoDivAccountView'>
                    <h2>UserName: {user.userName}</h2>
                    <h2>First Name: {user.firstName}</h2>
                    <h2>Last Name: {user.LastName}</h2>

                </div>
            </GlassCard>
            <GlassCard className='accountToDosDiv'>
                <div>
                <div className='glassContainerHeaderDiv'>
                    <h3>To Dos</h3>
                    {/* <IconButton color='primary' >
                            <TuneIcon />  
                    </IconButton> */}
                </div>
                <div className='divHeight'>
                    <ToDoListsDiv setModalOpen={setModalOpen} setReRender={setReRender} setModalChildren={setModalChildren}/>
                </div>
                

                </div>
                
            </GlassCard>
        </div>
        </div>
    )

}