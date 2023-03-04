import { User } from '@/lib/user';
import React, { useState } from 'react';
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


interface MainPageProps
{
    user: User
}

export default function MainPage({
    user
}:MainPageProps){
    const [modalOpen, setModalOpen]= useState(false)
    const [modalChildren, setModalChildren]= useState(null)
    return (
        <div>
            <ModalCard color='red' setModalOpen={setModalOpen} modalOpen={modalOpen}>
                {modalChildren}
            </ModalCard>
            <div>
                <GlassCard className='navBar'>
                    <h1 className='headerName'>Welcome {user.firstName}</h1>
                    <div className='iconsDiv'>
                        <Button sx={{...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant="contained">
                            <CreateTwoToneIcon sx={{marginRight: '10px'}}/>
                            Create New Job Board
                        </Button>
                        <IconButton  color='secondary'>
                            <PersonIcon />
                        </IconButton>
                    </div>


                </GlassCard>
                <div className='contentFlexDiv'>
                    <GlassCard className='jobBoardListsDiv'>
                        <h1 className='headerName subHeader'>Job Boards</h1>
                        <div className='jobBoardsList'>
                            <JobBoardCard color='blue' setModalOpen={setModalOpen} setModalChildren={setModalChildren}/>
                            <JobBoardCard color='pink' setModalOpen={setModalOpen} setModalChildren={setModalChildren}/>
                            <JobBoardCard color='red' setModalOpen={setModalOpen} setModalChildren={setModalChildren}/>
                        </div>
                        
                    </GlassCard>
                    <GlassCard className='toDosDiv'>
                        <h1 style={{textAlign: "center"}} className='headerName subHeader'>{"To Dos"}</h1>
                        <div className='toDoSettingsButton'>
                            <IconButton color='secondary'>
                                <TuneIcon />
                            </IconButton>

                        </div>
                        <div className='toDoSList'>

                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            v
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>
                            <MainPageToDoCheckBox toDoName='asvbsjavdsaucvbyudsavcbhdjsavcyudsjvcdsuacvdjsavcdusacvdtsyauvcgsadhjvcdsajvcdsjhavcfdghjas'/>

                        </div>
                        

                    </GlassCard>

                </div>
                
            </div>
        </div>
    )

}