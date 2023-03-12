import { JobBoard, JobColumn } from "@/lib/database"
import "@/styles/components.css/jobBoardTableView.css"
import { PocketedJob } from "@prisma/client"
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";


interface TableViewProps
{
    jobBoard: JobBoard
    columnNameFilter: string | null;
    searchValue: any;

}

export default function TableView({
    jobBoard,
    columnNameFilter,
    searchValue
}:TableViewProps){
    const router= useRouter()

    function returnFilteredArrayOfPocketedJobs(){
        if(columnNameFilter === 'salary'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return pocketedJob.salary.toLowerCase().includes(searchValue.toLowerCase().trim())
            })
        }
        if(columnNameFilter === 'jobPositionName'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return pocketedJob.jobPositionName.toLowerCase().includes(searchValue.toLowerCase().trim())
            })
        }
        if(columnNameFilter === 'companyName'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return pocketedJob.companyName.toLowerCase().includes(searchValue.toLowerCase().trim())
            })
        }
        if(columnNameFilter === 'description'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return (pocketedJob.description as string).toLowerCase().includes(searchValue.toLowerCase().trim())
            })
        }
        if(columnNameFilter === 'rejected'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return pocketedJob.rejected === searchValue
            })
        }
        if(columnNameFilter === 'offerMade'){
            return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                return pocketedJob.offerMade === searchValue
            })
        }
        const extraColumns = JSON.parse(jobBoard.extraJobColumns)
        const index = extraColumns.findIndex((column: JobColumn)=>{ return column.columnName === columnNameFilter})
        
       
        if(index >=0 && extraColumns[index].columnName === columnNameFilter){
                if(extraColumns[index].columnType === 'checkbox'){
                    return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                        return JSON.parse(pocketedJob.jobColumns as any)[index].value === searchValue
                    })

                }
                if(extraColumns[index].columnType === 'date'){
                    return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                        return JSON.parse(pocketedJob.jobColumns as any)[index].value === searchValue
                    })

                }
                if(extraColumns[index].columnType === 'color'){
                    return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                        return JSON.parse(pocketedJob.jobColumns as any)[index].value === searchValue
                    })

                }
                if(extraColumns[index].columnType === 'file'){
                    return jobBoard.pocketedJobs

                }

                return jobBoard.pocketedJobs.filter((pocketedJob)=>{
                    return JSON.parse(pocketedJob.jobColumns as any)[index].value.includes(searchValue) 
                })
        }

        
        

    return jobBoard.pocketedJobs
        

    }
    return (
        <div className="TableView">

            <table>
                <tr>
                    <th>
                        JOB POSITION NAME
                    </th>
                    <th>
                        COMPANY NAME
                    </th>
                    <th>
                        Salary
                    </th>
                    <th>
                        DESCRIPTION
                    </th>
                    {

                        JSON.parse(jobBoard.extraJobColumns).map((column: JobColumn, index: Number)=>{
                            return(
                                <th key={`Table view column table header ${index}`}>{column.columnName.toUpperCase()}</th>
                            )
                        })
                        
                    }

                    <th>
                        REJECTED
                    </th>
                    <th>
                        OFFER MADE
                    </th>

                </tr>
                {
                    returnFilteredArrayOfPocketedJobs().length === 0 ? 
                    <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        margin: 'auto',
                        top: "40%"
                    }}
                    >
                        <h2>No Jobs that You have Pocketed Match Your Search </h2>
                    </div>
                    :
                    (returnFilteredArrayOfPocketedJobs()).map((job: any, index1: Number)=>{
                        return(
                            <tr className="jobTableRow" key={`table data table row ${job.id}`}>
                                <td>
                                    <div className="align-center-items-table-view">
                                        <IconButton
                                        onClick={()=>{
                                            router.push(`/pocketed_job/${job.id}`)
                                        }}
                                        sx={{color: `${job.color}`}}>
                                            <DataUsageIcon />
                                        </IconButton>
                                    
                                    <h3 
                                    className="jobPositionHeaderTableViewJobBoard"
                                    onClick={()=>{
                                        window.open(`${job.jobUrl}`)
                                    }}
                                    >   
                                        {job.jobPositionName}
                                    </h3>
                                    
                                    </div>
                                
                                </td>
                                <td>
                                    {job.companyName}
                                </td>
                                <td>
                                    {job.salary}
                                </td>
                                <td>
                                    {job.description}
                                </td>
                                {JSON.parse(job.jobColumns).map(
                                    (jobColumn: JobColumn, index: Number)=>{
                                    if(jobColumn.columnType === 'checkbox'){
                                        return(
                                            <td
                                            key={`job board job ${job.id} extra tr column ${index1} ${index}`}
                                            >
                                                {jobColumn.value ? <CheckIcon sx={{color: `${job.color}`}}/> : <CloseIcon sx={{color: `${job.color}`}}/>}
                                            </td>
                                        )
                                    }
                                    if(jobColumn.columnType === 'link'){
                                        return(
                                            <td
                                            key={`job board job ${job.id} extra tr column ${index1} ${index}`}
                                            >
                                                <a href={`${jobColumn.value}`}>{job.companyName} at {job.jobPositionName} {jobColumn.columnName}</a>
                                            </td>
                                        )
                                    }
                                    if(jobColumn.columnType === 'color'){
                                        return(
                                            <td
                                            key={`job board job ${job.id} extra tr column ${index1} ${index}`}
                                            >
                                                <TripOriginIcon sx={{color: `${jobColumn.value}`}}/>
                                            </td>
                                        )
                                    }
                                    return(
                                        <td key={`job board job ${job.id} extra tr column ${index1} ${index}`}>
                                            {jobColumn.value}
                                        </td>
                                    )
                                })}
                                <td
                                style={{color: `${job.rejected? "red" : "green"}`}}
                                >
                                    {job.rejected ? "Yes" : "No"}
                                </td>
                                <td
                                style={{color: `${job.offerMade? "green" : "red"}`}}
                                >
                                    {job.offerMade ? "Yes" : "No"}
                                </td>
                            </tr>
                        )
                    })
                }
               

            </table>

            <style jsx>{`
                .TableView{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                }
            `}</style>
        </div>
    )

}