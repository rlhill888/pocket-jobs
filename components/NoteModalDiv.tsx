'use client'
import { IconButton } from '@mui/material';
import React, { ReactNode } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface NoteModalDivProps
{
    mode: 'light' | 'dark' | null;
    noteModalContents: ReactNode;
    setNoteModalOpen: Function;

}

export default function NoteModalDiv({
    mode,
    noteModalContents,
    setNoteModalOpen,
}:NoteModalDivProps){

    return (
        <div>
            <div className={`note ${mode === 'light' ?  'blackNoteBackgroundColorTransparent' : 'blackNoteBackgroundColorTransparent'} noteModalDiv`}>
                <div
                className='noteModalExitButton'
                >
                    <IconButton
                    onClick={()=>{
                        setNoteModalOpen(false)
                    }}
                    color={mode ==='light' ? 'tertiary' as any : 'tertiary' as any}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className='noteModalContents'>
                   {noteModalContents} 
                </div>
                

            </div>
        </div>
    )

}