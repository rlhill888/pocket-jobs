import React from 'react';
import "@/styles/components.css/CreateNewJobBoardTable.css"
import CreateNewJobBoardTr from './CreateNewJobBoardTr';
import { ExtraJobColumn } from '@/lib/database';
import { TextField } from '@mui/material';

interface CreateNewJobBoardTableProps
{
    extraTablesArray: ExtraJobColumn[];
    setExtraJobColumnsArray: Function;
}

export default function CreateNewJobBoardTable({
    extraTablesArray,
    setExtraJobColumnsArray,
}:CreateNewJobBoardTableProps){

    return (
        <table>
            <tr>
                <th>
                    Column Name
                </th>
                <th>
                    Column Type
                </th>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Company Name
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Text
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Job Position
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Text
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Salary
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Text
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Job URL
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Link
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Description
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Text
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        rejected
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Checkbox
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Offer Made
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Checkbox
                    </h3>
                </td>
            </tr>
            <tr>
                <td>
                    <h3 className='createBoardTableHeader columnNameHeader'>
                        Job Color
                    </h3>
                </td>
                <td>
                    <h3 className='createBoardTableHeader columnTypeHeader'>
                        Color
                    </h3>
                </td>
            </tr>
            {

                extraTablesArray.map((table, index)=>{
                    return( <CreateNewJobBoardTr extraTablesArray={extraTablesArray} key={`create new job board tr ${index}`} setExtraJobColumnsArray={setExtraJobColumnsArray} index={index}/>)
                })

            }
        </table>
    )

}