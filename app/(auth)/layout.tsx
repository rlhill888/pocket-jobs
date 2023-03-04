"use client"
import { ReactNode } from "react";
import "@/styles/auth/authLayout.css";
import { themeOptions } from "@/lib/theme"
import { ThemeProvider} from "@mui/material/styles"



interface AuthRootLayoutProps{
    children: ReactNode
}

export default function AuthRootLayout({children}:AuthRootLayoutProps){
    

    
    return(
      
                <div className="mainBody">
                    {children}
                </div>
            
    )
}