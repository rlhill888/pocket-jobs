import "@/styles/home/WelcomeAndAbout.css"
import { Button } from "@mui/material"
import Lottie from "lottie-web"
import { useEffect, useRef } from "react"
import titleImage from "@/assets/job-description-hero-banner.png"
import Image from "next/image";
import { useRouter } from "next/navigation"

interface WelcomeAndAboutViewProps
{

}

export default function WelcomeAndAboutView({

}:WelcomeAndAboutViewProps){
    const router= useRouter()


    return (
        <div className="WelcomeAndAboutView">
            
            <div className="titleDiv">
                <div className="mainTitleAndImageDiv">
                    <div>
                        <h1 className="mainTitle">Pocket Jobs</h1>
                        <h3 className="titleDescription">An Application To Make Your Hunt For Jobs That Much Easier!</h3>
                        <Button onClick={()=> router.push('/signin')} sx={{background: 'linear-gradient( 109.6deg,  #3df5a7 11.2%, rgba(9,111,224,1) 91.1% )', fontSize: '1rem', fontFamily: 'font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', textWeight: '400'}} variant="contained">Get Started Tracking Your Jobs Today</Button>
                    </div>
                    
                    <Image alt='nice woman working' src={titleImage}></Image>
                </div>
                
            </div>
            <div className="mainContentDiv">
                <div style={{margin: '40px'}} className="glowing-card">
                    <h1>Description</h1>
                </div>

            </div>

            

            <style jsx>{`
                .WelcomeAndAboutView{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                }
            `}</style>
        </div>
    )

}