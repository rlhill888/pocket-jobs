export interface ExtraJobColumn{
    columnName: string;
    columnType: "text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color"
}

export const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}