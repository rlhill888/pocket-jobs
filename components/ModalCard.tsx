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
}

export default function ModalCard({
    modalOpen,
    setModalOpen,
    children,
    color,
}:ModalCardProps){
    if(!modalOpen){
        return(
            <></>
        )
    }else{
        return (
        <div className='blockedOutDiv'>
            <div 
            style={color ? 
                {
                    boxShadow: `box-shadow: 0 0 20px ${color}`
                }
                :
                {

                }
            
            }
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