'use client'

import { aStep, headers } from '@/lib/database';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainPageToDoCheckBox from './MainPageToDoCheckBox';
import CircularProgress from '@mui/material/CircularProgress';

interface ToDoListsDivProps
{
    setModalChildren: Function;
    setModalOpen: Function;
    setReRender: Function;
}

export default function ToDoListsDiv({
    setModalChildren,
    setModalOpen,
    setReRender

}:ToDoListsDivProps){
    const [loading, setLoading]= useState(true)
    const [toDosList, setToDosList]= useState(null)
    const [completedToDoList, setCompletedToDoList]= useState(null)
    const [reRenderData, setReRenderData]= useState(0)
    useEffect(()=>{
        setLoading(true)
        async function fetchData(){
            try{
                const response = await axios({
                    url: '/api/Steps/load_to_do_list',
                    headers: headers
                })
                

                const completedToDoList =response.data.filter((step: aStep)=>{
                    return step.completed === true
                })


                
                const uncompletedToDoListWithDueDates =response.data.filter((step: aStep)=>{
                    return step.completed === false && step.dueDate
                }).sort((a: aStep, b: aStep)=>{
                    return new Date(b.dueDate as string) as any + new Date(a.dueDate as string) as any
                })
                const uncompletedToDoListWithNoDueDates =response.data.filter((step: aStep)=>{
                    return step.completed === false && !step.dueDate
                })
                
                setToDosList([...uncompletedToDoListWithDueDates, ...uncompletedToDoListWithNoDueDates] as any) 
                setCompletedToDoList(completedToDoList)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [reRenderData])

    console.log('uncompleted to do list:', toDosList)
    console.log(' completed to do list:', completedToDoList)

    function refreshData(){
        setReRenderData(previous=> previous + 1)
    }
    
    if(loading || !toDosList && typeof(toDosList) !== 'object'){
        return(
        <div>
            <CircularProgress color='secondary'/>
        </div>
        )
    }

    if((toDosList as any).length < 1){
        return(
            <div>
                <h3>You currently Do not have any To dos.</h3>
                <h3>To create a to do, add follow up steps to a pocketed job.</h3>
            </div>
        )
    }
    return (
        <div>
        
            {(toDosList as any).map((step: aStep, index: number)=>{
                return(
                    <MainPageToDoCheckBox setReRender={setReRender} loading={loading} refreshData={refreshData} setLoading={setLoading} setModalOpen={setModalOpen} setModalChildren={setModalChildren} crossedOut={false} key={`${step.id} to do dive key`} step={step} />
                )
            })}
            {(completedToDoList as any).map((step: aStep, index: number)=>{
                return(
                    <MainPageToDoCheckBox setReRender={setReRender} loading={loading} refreshData={refreshData} setLoading={setLoading} setModalOpen={setModalOpen} setModalChildren={setModalChildren} crossedOut={true} key={`${step.id} to do dive key`} step={step} />
                )
            })}

            
            
        </div>
    )

}