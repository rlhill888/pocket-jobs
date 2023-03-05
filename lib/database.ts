export interface ExtraJobColumn{
    columnName: string;
    columnType: "text" | "number" | "checkbox" | "date" | "link" | "file" | "phone number" | "email" | "color"
}