export interface ExtraJobColumn{
    columnName: string;
    columnType: "text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color"
}

export const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}


export interface JobColumn{
    columnName: String;
    columnType: "text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color";
    value: any;
}

export interface Note{
    title: string;
    description: string;
}

export interface User{
    id: String;
    password: String;
    userName: String;
    firstName: String;
    LastName: String;
    jobBoards: JobBoard[];
    pocketedJobs: PocketedJob[]

}

export interface JobBoard{
    id: String;
    name: String;
    description: String;
    defaultJobColumns: string;
    extraJobColumns: string;
    allColumns: JobColumn[];
    user: User;
    userId: String;
    pocketedJobs: PocketedJob[];

}

export interface PocketedJob{
    id: String;
    createdAt: Date;
    salary: String;
    jobPositionName: String;
    companyName: String;
    jobUrl: String;
    description?: String;
    color: String;
    jobColumns: JobColumn[];
    rejected: Boolean;
    offerMade: Boolean;
    steps: aStep[];
    userId: string;
    notes: Note[];
    user: User;
    jobBoardId: String;
    jobBoard: JobBoard;
}

export interface aStep{
    name: string;
    dueDate?: string | null;
    stepDescription?: string | null;
    id: Number;
}

export const defaultColumns = [
    {
    columnName: "Company Name",
    columnType: "text"
    },
    {
        columnName: "Job Position",
        columnType: "text"
    },
    {
        columnName: "Salary",
        columnType: "text"
    },
    {
        columnName: "Job Url",
        columnType: "link"
    },
    {
        columnName: "Description",
        columnType: "text"
    },
    {
        columnName: "Job color",
        columnType: "color"
    },
    {
        columnName: "Rejected",
        columnType: "checkbox"
    },
    {
        columnName: "Offer made",
        columnType: "checkbox"
    },
    

]