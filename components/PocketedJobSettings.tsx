import { headers, PocketedJob } from '@/lib/database';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PocketedJobSettingsProps
{
    setModalOpen: Function;
    pocketedJob: PocketedJob;
}

export default function PocketedJobSettings({
    setModalOpen,
    pocketedJob

}:PocketedJobSettingsProps){
    const [loading, setLoading]= useState(false)
    const router = useRouter()

    return (
        <div>
            <h3>Delete This Pocketed Job?</h3>
            {loading ? <CircularProgress /> : <></>}
            <ButtonGroup disabled={loading}>
                <Button

                onClick={async()=>{
                    setLoading(true)
                    try{
                        const response = await axios({
                            url: '/api/pocketed_job/delete_pocketed_job',
                            method: 'PATCH',
                            headers: headers,
                            data: {
                                pocketedJobId: pocketedJob.id
                            }
                        })
                        router.push(`job_board/${pocketedJob.jobBoardId}`)
                    }catch(error){
                        console.log(error)
                    }
                    setLoading(false)
                }}
                
                >Yes</Button>
                <Button onClick={()=>{
                    setModalOpen(false)
                }}>No</Button>
            </ButtonGroup>

        </div>
    )

}