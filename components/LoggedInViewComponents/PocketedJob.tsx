import React from 'react';
import "@/styles/loggedInUserView/PocketedJob.css"
import GlassCard from '../GlassCard';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TuneIcon from '@mui/icons-material/Tune';
import { getFirstRGBValue } from '@/lib/theme';
import { IconButton } from '@mui/material';

interface PocketedJobProps
{
    color: string;
}

export default function PocketedJob({
    color
}:PocketedJobProps){
   
    return (
        <div className={`otherMainPocketedJobsDiv ${getFirstRGBValue(color) <= 127.5 ? "pocketedJobLightColor" : "pocketedJobDarkColor"}`}>
            <GlassCard className='pocketedJobsTitleDiv'>
                <div className='titleAndIconDiv'>
                    <DataUsageIcon sx={{color: color, marginRight: "10px"}}/>
                    <h1 className='pocketedJobTitle'>
                        Job
                    </h1>

                </div>
                
            </GlassCard>
            <div className='pocketedJobCardsDivisionDiv'>
                <div className='jobDataAndNotesDiv'>
                    <GlassCard className='pocketedJobsColumnCard'>
                        <div className='headerAndIconDiv'>
                            <h3>Job Data Table</h3>
                            <IconButton sx={{color: color}}>
                            <TuneIcon sx={{color: color}}/>  
                            </IconButton>
                            

                        </div>
                        
                        

                    </GlassCard>
                    <GlassCard className='pocketedJobsColumnCard'>
                        <div className='headerAndIconDiv'>
                            <h3>Notes</h3>
                            <TuneIcon sx={{color: color}}/>
                        </div>
                        
                        
                        
                    </GlassCard>
                </div>
                <GlassCard className='pocketedJbTodoDiv'>
                <div className='headerAndIconDiv'>
                            <h3>Steps</h3>
                            <IconButton sx={{color: color}}>
                            <TuneIcon sx={{color: color}}/>  
                            </IconButton>
                            

                        </div>

                </GlassCard>

            </div>
        </div>
    )

}