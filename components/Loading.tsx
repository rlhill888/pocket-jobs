import React from 'react';
import "@/styles/components.css/Loading.css"

interface LoadingProps
{
    loadingTitle?: string;
}

export default function Loading({
    loadingTitle
}:LoadingProps){

    return (
        <div className='loadingDiv'>
            <div className='centerLoadingItems'>
                <div className='loadingFlexRow'>

                <h1 className='loadingTitle'>Pocket Jobs</h1> 
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                </div>
                {
                    loadingTitle ? 
                    <h3 className='dynamicLoadingTitle'>{loadingTitle}</h3>
                    :
                    <></>
                }
                
                <div className="lds-ripple"><div></div><div></div></div>
                

            </div>
            
            


            
        </div>
    )

}