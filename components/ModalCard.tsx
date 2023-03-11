import React, { ReactNode } from 'react';
import "@/styles/components.css/ModalCard.css";
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { IconButton } from '@mui/material';

interface ModalCardProps
{
    modalOpen: Boolean;
    setModalOpen: Function;
    children?: ReactNode;
    color?: string;
    height?: string | null;
    width?: string | null;
}

export default function ModalCard({
    modalOpen,
    setModalOpen,
    children,
    color,
    height,
    width,
}:ModalCardProps){
    if(!modalOpen){
        return(
            <></>
        )
    }else{
        return (
        <div className='blockedOutDiv'>
            <div 
            style={{
                height: height ? height: `${window.innerHeight <= 569 ? "60vh" : "50vh"}`,
                width: width ? width: `${window.innerWidth <= 569 ? "90vw" : " 50vw"}`,
            }}
            className='innerModalDiv'>
                <div className='childrenDiv'>
                        {children}
                </div>
                <div className='xButton'>
                    <IconButton onClick={()=> setModalOpen(false)} size='large' color='secondary'>
                        <CancelTwoToneIcon />
                    </IconButton>
                </div>
                

            </div>
        </div>
    )
    }

}