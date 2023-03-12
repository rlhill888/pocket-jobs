import { User } from '@/lib/user';
import React, { ReactNode, useState } from 'react';
import GlassCard from '../GlassCard';
import "@/styles/loggedInUserView/MainPage.css"
import { Button } from '@mui/material';
import { gradientButton1 } from '@/styles/materialUiStyles';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import JobBoardCard from '../JobBoardCard';
import ModalCard from '../ModalCard';
import MainPageToDoCheckBox from '../MainPageToDoCheckBox';
import TuneIcon from '@mui/icons-material/Tune';
import CreateNewJobBoard from '../CreateNewJobBoard';
import { useRouter } from 'next/navigation';
import ToDoListsDiv from '../ToDoListsDiv';


interface MainPageProps
{
    user: User;
    refreshUserData: Function
}

export default function MainPage({
    user,
    refreshUserData
}:MainPageProps){
    const [modalOpen, setModalOpen]= useState(false)
    const [modalChildren, setModalChildren]: [ReactNode | null, Function]= useState(null)
    const [reRender, setReRender]= useState(0)
    const router = useRouter()
    return (
        <div>
            <ModalCard  color='red' setModalOpen={setModalOpen} modalOpen={modalOpen}>
                {modalChildren}
            </ModalCard>
            <div>
                <GlassCard
                style={{
                    padding: '0, 25px'
                }}
                className='navBar'>
                    <h1 className='headerName'>Welcome {user.firstName}</h1>
                    <div className='iconsDiv'>
                        <Button onClick={()=> {
                            setModalChildren(<CreateNewJobBoard setModalOpen={setModalOpen} refreshUserData={refreshUserData} user={user}/>)
                            setModalOpen(true)
                            }} sx={window.innerWidth <1024 ? {} : {...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant={window.innerWidth < 1024 ? 'text' : 'contained'}>
                            <CreateTwoToneIcon sx={{marginRight: '10px'}}/>
                            Create New Job Board
                        </Button>
                        <IconButton onClick={()=>{
                            router.push("/account")
                        }} color='secondary'>
                            <PersonIcon />
                        </IconButton>
                    </div>


                </GlassCard>
                <div className='contentFlexDiv'>
                    <GlassCard className='jobBoardListsDiv'>
                        <h1 className='headerName subHeader'>Job Boards</h1>
                        <div className='jobBoardsList'>
                            {
                                user.jobBoards.length < 1 ?
                                <div className='noJobBoardsView'>
                                    <h2>You Currently Do not Have any Job Boards</h2>
                                    <Button
                                    onClick={()=> {
                                        setModalChildren(<CreateNewJobBoard setModalOpen={setModalOpen} refreshUserData={refreshUserData} user={user}/>)
                                        setModalOpen(true)
                                        }}
                                    > <CreateTwoToneIcon sx={{marginRight: '10px'}}/> Create One</Button>
                                </div>
                                :
                                user.jobBoards.map((jobBoard: any, index)=>{
                                    return(
                                        <JobBoardCard refreshUserData={refreshUserData} jobBoard={jobBoard} key={`Job board card ${jobBoard.id} ${index}`}  setModalOpen={setModalOpen} setModalChildren={setModalChildren}/>
                                    )
                                })
                            }
                        </div>
                        
                    </GlassCard>
                    <GlassCard className='toDosDiv'>
                        <h1 className='headerName subHeader'>{"To Dos"}</h1>
                        <div className='toDoSettingsButton'>
                            {/* <IconButton color='secondary'>
                                <TuneIcon />
                            </IconButton> */}

                        </div>
                        <div className='toDoSList'>
                            <ToDoListsDiv setReRender={setReRender} setModalChildren={setModalChildren} setModalOpen={setModalOpen}/>

                        </div>
                        

                    </GlassCard>

                </div>
                
            </div>
        </div>
    )

}