import React, { useEffect, useState } from 'react';
import GlassCard from '../GlassCard';
import "@/styles/loggedInUserView/jobBoardPage.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { gradientButton1 } from '@/styles/materialUiStyles';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Button, Checkbox } from '@mui/material';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { queryIdFromUrl } from '@/lib/routing';
import Loading from '../Loading';
import ModalCard from '../ModalCard';
import PocketAJob from '../PocketAJob';
import "@/styles/components.css/PocketAJob.css"
import { JobBoard, JobColumn } from '@/lib/database';
import { PocketedJob } from '@prisma/client';
import TableView from '../TableView';


interface JobBoardPageProps
{
    name: string;
}

export default function JobBoardPage({
    name
}:JobBoardPageProps){
    const router = useRouter()
    const [user, setUser]= useState(null)
    const [refreshUserDataState, setRefreshUserData]= useState(0)
    const [triedFetchingUser, setTriedFetchingUser]= useState(false)
    const [jobBoard, setJobBoard]: [any, Function]= useState(null)
    const [modalOpen, setModalOpen]= useState(false)
    const [modalChildren, setModalChildren]= useState(<></>)
    const [dataView, setDataView]: ['Table' | 'Other', Function]= useState('Table')
    const [modalWidthAndHeight, setModalWidthAndHeight]: [{width: string | null, height: string | null}, Function]= useState({
        width: null,
        height: null
    })
    const [valuesArray, setValuesArray]: [string[], Function]= useState([])
    const [filter, setFilter]= useState(null)
    const [searchValue, setSearchValue]: [any, Function]= useState(null)
    const [searchInputType, setSearchInputType]: ["text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color" | 'all' | null, Function ]= useState('all')
    const [filteredJobs, setFilteredJobs]= useState([])
    function refreshUserData(){
        setRefreshUserData(previous=> previous+1)
    }
    console.log('values Array', valuesArray)
    useEffect(()=>{
       async function fetchUser(){
        
        try{

            const response = await axios({
                url: '/api/me',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  }
            })
            setUser(response.data)
            let values = ['all', 'salary', 'jobPositionName', 'companyName', 'description', 'rejected', 'offerMade']
            
            const index= response.data.jobBoards.findIndex((jobBoard: any)=> jobBoard.id === queryIdFromUrl(window.location.href))
            
            setJobBoard(()=>{
                const index= response.data.jobBoards.findIndex((jobBoard: any)=> jobBoard.id === queryIdFromUrl(window.location.href))
                return response.data.jobBoards[index]
            })

            for(let column of JSON.parse(response.data.jobBoards[index].extraJobColumns)){
                values.push(column.columnName)
            }
            setValuesArray(values)
            setTriedFetchingUser(true)
        
          }catch(error){
            setTriedFetchingUser(true)
          }  
       }
       fetchUser()
            
    }, [refreshUserDataState])
    console.log(jobBoard)

    if(!jobBoard && !user && triedFetchingUser){
        router.push('/signin')
        return <Loading loadingTitle='Redirecting to Sign In...'/>
    }

    if(
        
        !jobBoard || !user || !valuesArray
        ){
        return <Loading loadingTitle='Loading Your Job Board...'/>
    }

    function detectAndCapitalize(str: string) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
          if (i > 0 && str[i-1] !== ' ' && str[i-1] !== str[i-1].toUpperCase() && str[i] === str[i].toUpperCase()) {
            result += ' ';
          }
          result += str[i].toUpperCase();
        }
        return result;
      }

    function determineInputType(){
        if(searchInputType === 'text'){
            return(
                <TextField value={searchValue} onChange={(e)=> {
                    
                    setSearchValue(e.target.value)
                    
                    }} variant='standard'/>
            )
        }
        if(searchInputType === 'number'){
            return(
                <TextField type='number' value={searchValue} onChange={(e)=> {
                    
                    setSearchValue(e.target.value)
                    
                    }} variant='standard'/>
            )
        }
        if(searchInputType === 'phone number'){
            return(
                <TextField type='tel' value={searchValue} onChange={(e)=> {
                    
                    setSearchValue(e.target.value)
                    
                    }} variant='standard'/>
            )
        }
        if(searchInputType === 'color'){
            return(
                <input type='color' value={searchValue} onChange={(e)=> {
                    
                    setSearchValue(e.target.value)
                    
                    }}/>
            )
        }
        if(searchInputType === 'date'){
            return(
                <TextField type='date' value={searchValue} onChange={(e)=> {
                    
                    setSearchValue(e.target.value)
                    
                    }} variant='standard'/>
            )
        }
        if(searchInputType === 'checkbox'){
            return(
                <Checkbox checked={searchValue as any} onChange={(e)=> {
                    
                    setSearchValue(e.target.checked)
                    
                    }} />
            )
        }
        if(searchInputType === 'file'){
            return(
                <></>
            )
        }
        if(searchInputType === 'all'){
            return(
               <></>
            )
        }
        
        else{
            return(
                <></>
            )
        }
    }

    return (
        <div className='otherMainJobBoardDiv'>
            <ModalCard width={modalWidthAndHeight.width} height={modalWidthAndHeight.height} modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    {modalChildren}
            </ModalCard>
            <GlassCard className='jobBoardHeaderDiv'>
                <h1 className='jobBoardName'>{jobBoard.name}</h1>
                <div>

                
                <Button
                onClick={()=>{
                    router.push("/")
                }}
                sx={{marginRight: "15px"}}>
                    <KeyboardDoubleArrowLeftIcon />
                    Home Page
                </Button>
                {
                jobBoard.pocketedJobs.length >= 1 ?    
                <Button 
                className='pocketAJobButton'
                onClick={()=>{
                    setModalWidthAndHeight({
                        width: "75vw",
                        height: "75vh"
                    })
                    setModalOpen(true)
                    setModalChildren(<PocketAJob refreshUserData={refreshUserData} setModalOpen={setModalOpen} jobBoard={jobBoard}></PocketAJob>)
                }}
                sx={window.innerWidth <1204 ? {} : {...gradientButton1,  boxShadow: 'none'}} variant={window.innerWidth < 1024 ? "text" :"contained"} color={window.innerWidth < 1024 ? 'secondary' : 'primary'}>
                            <WorkTwoToneIcon sx={{marginRight: '10px'}}/>
                            Pocket a Job
                </Button>

                :
                <></>
                
                }
                </div>
            </GlassCard>



            <GlassCard className='searchDiv'>
                <SearchIcon color='primary'/>
                {determineInputType()}
                <Select value={filter} onChange={(e)=>{ 
                    const extraColumns = JSON.parse(jobBoard.extraJobColumns)
                    if(e.target.value === 'salary' 
                    || e.target.value === 'jobPositionName'
                    || e.target.value === 'companyName'
                    || e.target.value === 'description'
                    ){
                        setSearchValue('')
                        setSearchInputType('text')
                    }
                    if(e.target.value === 'rejected'
                    || e.target.value === 'offerMade'
                    ){
                        setSearchValue(false)
                        setSearchInputType('checkbox')
                    }
                    if(e.target.value === 'all'
                    || e.target.value === 'file'
                    ){
                        setSearchValue(null)
                        setSearchInputType('all')
                    }
                    
                    const index = extraColumns.findIndex((column: JobColumn)=>{ return column.columnName == e.target.value})
                    if(index >= 0){
                        if(extraColumns[index].columnType === 'text'
                        || extraColumns[index].columnType === 'email'
                        || extraColumns[index].columnType === 'link'
                        ){
                            setSearchValue('')
                            setSearchInputType('text')
                        }
                        if(extraColumns[index].columnType === 'number'){
                            setSearchValue('')
                            setSearchInputType('number')
                        }
                        if(extraColumns[index].columnType === 'checkbox'){
                            setSearchValue(false)
                            setSearchInputType('checkbox')
                        }
                        if(extraColumns[index].columnType === 'phone number'){
                            setSearchValue('')
                            setSearchInputType('phone number')
                        }
                        if(extraColumns[index].columnType === 'date'){
                            setSearchValue('')
                            setSearchInputType('date')
                        }
                        if(extraColumns[index].columnType === 'color'){
                            setSearchValue('#FFFFFF')
                            setSearchInputType('color')
                        }
                    }
                    setFilter(e.target.value as any)
                    }} variant='standard'>
                    {
                        valuesArray.map((value: string, index: number)=>{
                            return( 
                            <MenuItem value={value} key={`${value} ${index} search value select`}>
                                {detectAndCapitalize(value)}
                            </MenuItem>)
                        })
                    }
                </Select>
            </GlassCard>



            <GlassCard className='jobsListDiv'>
                {
                    jobBoard.pocketedJobs.length === 0 ?

                    <div className='doNotHaveAnyPocketedJobsDiv'>
                        <h1>
                            You currently do not have any jobs pocketed for this job board yet
                        </h1>
                        <Button
                        onClick={()=>{
                            setModalWidthAndHeight({
                                width: "75vw",
                                height: "75vh"
                            })
                            setModalOpen(true)
                            setModalChildren(<PocketAJob refreshUserData={refreshUserData} setModalOpen={setModalOpen} jobBoard={jobBoard}></PocketAJob>)
                        }}
                        sx={{...gradientButton1, marginRight: "30px", boxShadow: 'none'}} variant="contained">
                            <WorkTwoToneIcon sx={{marginRight: '10px'}}/>
                            Pocket a Job
                        </Button>
                    </div>
                    :
                    <TableView columnNameFilter={filter} searchValue={searchValue} jobBoard={jobBoard}/>
                }
               

            </GlassCard>
        </div>
    )

}