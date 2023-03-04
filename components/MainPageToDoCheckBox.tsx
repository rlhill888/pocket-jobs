import React from 'react';
import "@/styles/components.css/MainPageToDoCssCheckBox.css"
import Checkbox from '@mui/material/Checkbox';

interface MainPageToDoCheckBoxProps
{
    toDoName: string;
}

export default function MainPageToDoCheckBox({
    toDoName,
}:MainPageToDoCheckBoxProps){

    return (
        <div className='toDoDiv'>
            <Checkbox color='secondary'/>
            <h3 className='toDoHeader'>{toDoName}</h3>
            
        </div>
    )

}