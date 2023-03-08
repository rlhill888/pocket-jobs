import React, { useEffect, useState } from 'react';
import GlassCard from '../GlassCard';
import "@/styles/loggedInUserView/jobBoardPage.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { gradientButton1 } from '@/styles/materialUiStyles';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Button, Checkbox } from '@mui/material';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { queryIdFromUrl } from '@/lib/routing';
import Loading from '../Loading';
import ModalCard from '../ModalCard';
import PocketAJob from '../PocketAJob';
import "@/styles/components.css/PocketAJob.css"
import { JobColumn } from '@/lib/database';
import { PocketedJob } from '@prisma/client';
import TableView from '../TableView';


interface JobBoardPageProps
{
    name: string;
}

export default function JobBoardPage({
    name
}:JobBoardPageProps){
    const router = useRouter()
    const [user, setUser]= useState(null)
    const [refreshUserDataState, setRefreshUserData]= useState(0)
    const [triedFetchingUser, setTriedFetchingUser]= useState(false)
    const [jobBoard, setJobBoard]: [any, Function]= useState(null)
    const [modalOpen, setModalOpen]= useState(false)
    const [modalChildren, setModalChildren]= useState(<></>)
    const [dataView, setDataView]: ['Table' | 'Other', Function]= useState('Table')
    const [modalWidthAndHeight, setModalWidthAndHeight]: [{width: string | null, height: string | null}, Function]= useState({
        width: null,
        height: null
    })
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
            setJobBoard(()=>{
                const index= response.data.jobBoards.findIndex((jobBoard: any)=> jobBoard.id === queryIdFromUrl(window.location.href))

                debugger
                return response.data.jobBoards[index]
            })
            setTriedFetchingUser(true)
        
          }catch(error){
            setTriedFetchingUser(true)
          }  
       }
       fetchUser()
            
    }, [refreshUserDataState])
    console.log(user)

    if(!jobBoard && !user && triedFetchingUser){
        router.push('/signin')
        return <Loading loadingTitle='Redirecting to Sign In...'/>
    }

    if(!jobBoard || !user){
        return <Loading loadingTitle='Loading Your Job Board...'/>
    }

    return (
        <div className='otherMainJobBoardDiv'>
            <ModalCard width={modalWidthAndHeight.width} height={modalWidthAndHeight.height} modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    {modalChildren}
            </ModalCard>
            <GlassCard className='jobBoardHeaderDiv'>
                <h1 className='jobBoardName'>{jobBoard.name}</h1>
                <div>

                
                <Button
                onClick={()=>{
                    router.push("/")
                }}
                sx={{marginRight: "15px"}}>
                    <KeyboardDoubleArrowLeftIcon />
                    Home Page
                </Button>
                {
                jobBoard.pocketedJobs.length >= 1 ?    
                <Button 
                onClick={()=>{
                    setModalWidthAndHeight({
                        width: "75vw",
                        height: "75vh"
                    })
                    setModalOpen(true)
                    setModalChildren(<PocketAJob refreshUserData={refreshUserData} setModalOpen={setModalOpen} jobBoard={jobBoard}></PocketAJob>)
                }}
                sx={{...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant="contained">
                            <WorkTwoToneIcon sx={{marginRight: '10px'}}/>
                            Pocket a Job
                </Button>

                :
                <></>
                
                }
                </div>
            </GlassCard>
            <GlassCard className='searchDiv'>
                <SearchIcon color='primary'/>
                <TextField variant='standard'/>
                <Select variant='standard'>
                    <MenuItem value={"hi"}>Value</MenuItem>
                </Select>
            </GlassCard>
            <GlassCard className='jobsListDiv'>
                {
                    jobBoard.pocketedJobs.length === 0 ?

                    <div className='doNotHaveAnyPocketedJobsDiv'>
                        <h1>
                            You currently do not have any jobs pocketed for this job board yet
                        </h1>
                        <Button
                        onClick={()=>{
                            setModalWidthAndHeight({
                                width: "75vw",
                                height: "75vh"
                            })
                            setModalOpen(true)
                            setModalChildren(<PocketAJob refreshUserData={refreshUserData} setModalOpen={setModalOpen} jobBoard={jobBoard}></PocketAJob>)
                        }}
                        sx={{...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant="contained">
                            <WorkTwoToneIcon sx={{marginRight: '10px'}}/>
                            Pocket a Job
                        </Button>
                    </div>
                    :
                    <TableView jobBoard={jobBoard}/>
                }
               

            </GlassCard>
        </div>
    )

}