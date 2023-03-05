import React from 'react';
import "@/styles/loggedInUserView/Account.css"
import GlassCard from './GlassCard';
import { Button, IconButton } from '@mui/material';
import { gradientButton1 } from '@/styles/materialUiStyles';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import TuneIcon from '@mui/icons-material/Tune';

interface AccountcomponentProps
{
    
}

export default function Accountcomponent({

}:AccountcomponentProps){

    return (
        <div>

        <GlassCard className='mainAccountHeaderDiv'>
            <h1 className='userNameHeader'>User Name, Name</h1>
            <div className='headerNavBarButtons'>
                <Button sx={{marginRight: "15px"}} ><KeyboardBackspaceTwoToneIcon />
                    Back To Job Board
                </Button>

                <Button variant='contained' sx={{...gradientButton1}}>
                    View Metrics
                </Button>
            </div>
        </GlassCard>
        <div className='otherMainAccountDiv'>
            <GlassCard className='accountInfoDiv'>
                <div className='glassContainerHeaderDiv'>
                <h3>Account Info</h3>
                <IconButton color='primary' >
                            <TuneIcon />  
                </IconButton>

                </div>
                <div>

                </div>
            </GlassCard>
            <GlassCard className='accountToDosDiv'>
                <div className='glassContainerHeaderDiv'>
                    <h3>To Dos</h3>
                    <IconButton color='primary' >
                            <TuneIcon />  
                    </IconButton>
                </div>
            </GlassCard>
        </div>
        </div>
    )

}