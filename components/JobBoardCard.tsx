import React from 'react';
import "@/styles/components.css/JobBoardCard.css";
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';

interface JobBoardCardProps
{
    setModalChildren: Function;
    setModalOpen: Function;
    color: string;
}

export default function JobBoardCard({
    setModalChildren,
    setModalOpen,
    color,
}:JobBoardCardProps){

    return (
        <div className='glowing-card jobBoardCard'>
            <div className='headerDiv'>
                <h3 className='header'>Job Board Name</h3>
                <IconButton
                onClick={()=>{
                    setModalOpen(true)
                    setModalChildren(()=>{
                        return(
                            <div>
                                settings

                            </div>
                        )
                    })
                }}
                >
                    <TuneIcon />
                </IconButton>

            </div>
            <div  className='jobBoardCardDescriptionDiv'>
                <p>Desciption of job board</p>
            </div>
        </div>
    )

}