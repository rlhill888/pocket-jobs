import React from 'react';
import GlassCard from '../GlassCard';
import "@/styles/loggedInUserView/jobBoardPage.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { gradientButton1 } from '@/styles/materialUiStyles';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Button } from '@mui/material';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useRouter } from 'next/navigation';


interface JobBoardPageProps
{
    name: string;
}

export default function JobBoardPage({
    name
}:JobBoardPageProps){
    const router = useRouter()

    return (
        <div className='otherMainJobBoardDiv'>
            <GlassCard className='jobBoardHeaderDiv'>
                <h1 className='jobBoardName'>{name}</h1>
                <div>

                
                <Button
                onClick={()=>{
                    router.push("/")
                }}
                sx={{marginRight: "15px"}}>
                    <KeyboardDoubleArrowLeftIcon />
                    Home Page
                </Button>
                <Button sx={{...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant="contained">
                            <WorkTwoToneIcon sx={{marginRight: '10px'}}/>
                            Pocket a Job
                </Button>
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
                <div
                
                className='jobDiv'
                >
                    <DataUsageIcon sx={{color: 'red'}}/>
                    <h3 className='jobName'>
                        Job Name
                    </h3>
                    <div>

                    </div>

                </div>

            </GlassCard>
        </div>
    )

}