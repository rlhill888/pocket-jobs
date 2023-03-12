'use client'
import { ReactNode } from "react";
import "@/styles/global.css"
import { themeOptions } from "@/lib/theme"
import { ThemeProvider} from "@mui/material/styles";
import React from "react";
import SafeHydrate from "@/components/SafeHydrate";



interface AuthRootLayoutProps{
    children: ReactNode
}


export default function AuthRootLayout({children}:AuthRootLayoutProps){
    

    
    return(
        
        <html suppressHydrationWarning lang="en">
            <body>
            <SafeHydrate>

            
            <ThemeProvider theme={themeOptions}>
               
                    {children}
               
            </ThemeProvider>  

            </SafeHydrate> 
            </body>
        </html>
        
    )
}