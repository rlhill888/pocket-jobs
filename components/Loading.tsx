import React from 'react';
import "@/styles/components.css/Loading.css"

interface LoadingProps
{
    
}

export default function Loading({

}:LoadingProps){

    return (
        <div className='loadingDiv'>
            <div className='centerLoadingItems'>
                <div className='loadingFlexRow'>

                <h1 className='loadingTitle'>Pocket Jobs</h1> 
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                </div>
                <div className="lds-ripple"><div></div><div></div></div>

            </div>
            
            


            
        </div>
    )

}