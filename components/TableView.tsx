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
}

export default function TableView({
    jobBoard
}:TableViewProps){
    const router= useRouter()
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
                    jobBoard.pocketedJobs.map((job: any, index1: Number)=>{
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