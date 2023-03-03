'use client'
import { NavbarRoutes } from "@/lib/navbarRoutes"
import { useRouter } from "next/navigation"
import "@/styles/components.css/Navbar.css"
export default function Navbar({}){

    const router = useRouter()
    return(
        <div className="navBar">
            {NavbarRoutes.map((route)=>{
                return(
                <button 
                    onClick={()=> router.push(route.route)}
                    key={`Navigation Route ${route.name}`}>
                        {route.name}
                </button>)
            })}
        
        
        </div>
    )
}