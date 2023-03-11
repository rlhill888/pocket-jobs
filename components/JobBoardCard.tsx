import React from 'react';
import "@/styles/components.css/JobBoardCard.css";
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Icon } from '@mui/material';
import JobBoardSettings from './JobBoardSettings';

interface JobBoardCardProps
{
    setModalChildren: Function;
    setModalOpen: Function;
    jobBoard: any;
    refreshUserData: Function
}

export default function JobBoardCard({
    setModalChildren,
    setModalOpen,
    jobBoard,
    refreshUserData,
    
}:JobBoardCardProps){
    const router = useRouter()
    return (
        <div className='glowing-card jobBoardCard'>
            <div className='headerDiv'>
                <h3 className='header'>{jobBoard.name}</h3>
                <div>
                <IconButton
                onClick={()=>{
                    setModalOpen(true)
                    setModalChildren(()=>{
                        return(
                            <JobBoardSettings refreshUserData={refreshUserData} setModalOpen={setModalOpen} jobBoard={jobBoard} />
                        )
                    })
                }}
                >
                    <TuneIcon />
                </IconButton>

                <IconButton
                onClick={()=>{
                    router.push(`/job_board/${jobBoard.id}`)
                }}
                color='secondary'>
                    <DoubleArrowIcon />
                </IconButton>

                </div>
                

            </div>
            <div  className='jobBoardCardDescriptionDiv'>
                <p className='pTagJobBoardCard'>{jobBoard.description}</p>
            </div>
        </div>
    )

}