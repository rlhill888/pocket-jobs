export interface ExtraJobColumn{
    columnName: string;
    columnType: "text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color"
}

export const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
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