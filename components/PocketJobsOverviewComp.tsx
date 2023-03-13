import React from 'react';
import "@/styles/components.css/PocketJobsOverviewComp.css"
import GlassCard from './GlassCard';
import Image from "next/image";

import image1 from "@/assets/pocket jobs overview pictures/1.png"
import image2_1 from "@/assets/pocket jobs overview pictures/2, 1.png"
import image2_2 from "@/assets/pocket jobs overview pictures/2, 2.png"
import image3 from "@/assets/pocket jobs overview pictures/3.png"
import image4_1 from "@/assets/pocket jobs overview pictures/4, 1.png"
import image4_2 from "@/assets/pocket jobs overview pictures/4, 2.png"
import image5 from "@/assets/pocket jobs overview pictures/5.png"
import image6 from "@/assets/pocket jobs overview pictures/6.png"
import image7 from "@/assets/pocket jobs overview pictures/7.png"
import image8 from "@/assets/pocket jobs overview pictures/8.png"
import image9 from "@/assets/pocket jobs overview pictures/9.png"
import image9_5 from "@/assets/pocket jobs overview pictures/9, 5.png"
import image10 from "@/assets/pocket jobs overview pictures/10.png"

interface PocketJobsOverviewCompProps
{
    
}

export default function PocketJobsOverviewComp({

}:PocketJobsOverviewCompProps){

    return (
        <div className='mainOverViewSection'>
            <div className='whatIsPocketJobs'>
                <h1 className='h1'>What is Pocket Jobs?</h1>
                <h3 className='h3'>Pocket Jobs is an innovative application that simplifies the job search process by enabling users to easily keep track of the jobs they apply for, along with relevant data and follow-up steps for each opportunity. Here is a step-by-step guide on how to use Pocket Jobs effectively.</h3>

            </div>
            <div className='makingYourFirstJobBoard'>
                <h1 
                style={{
                    textAlign: 'center'
                }}
                className='h1'>
                    How To Use Pocket Jobs
                </h1>

                <GlassCard className='textAlignLeft'>
                <h1 className='h1'>
                    Creating a Job Board
                </h1>

                <h3 className='h3 '>
                To use pocket jobs, first you must make a job board. A job board is is essentially a category of specific jobs you want to look for.
                </h3>
                <div className='flexGridWithOneImage'>
                    <h3 
                    className='h3 fiftyPercentWidth'>
                    {"For example, let's say you want to be a full time Nurse, but you also want to pursue a small career in the culinary arts as well. In this case you would make Two Different Job Boards. One Job Board Would be dedicated to looking for Jobs as a nurse in the healthcare industry, while the other would be dedicated to looking for jobs in the culinary arts industry."}
                    </h3>

                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image1}/>
                    </div>

                </div>
                <hr className='hr'></hr>
                <h3 className='h3'>
                        {`When Creating a job board, you must input a title and short description. Each Job board has the same set of default columns, but you can also give a Job board custom columns as well. Let's say for the culinary arts job board we have created, we want a column that indicates whether or not we would have to relocate to get that job.
                        `}
                    </h3>

                <div className='flexGridWithOneImage'>

                <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image explaining steps on how to use Pocket Jobs' src={image2_1}/>
                        <Image className='image' alt='Image explaining steps on how to use Pocket Jobs' src={image2_2}/>
                    </div>
                    <div className='fiftyPercentWidth'>
                        <h3 className='h3'>
                            {`In the job board creation menu we would click on the add a column button. After adding the column, we would then indicate the input type we want this column to be. There are many different input types, but for this specific example, we want a check box to indicate whether we do have to relocate for a job, or we do not have to.`}
                        </h3>
                    </div>

                </div>
                <h3 className='h3'>After this process is done, click the create a new job board button, and your job board is created!</h3>
                </GlassCard>

            </div>
            <div className='pocketingAJob'>
                <GlassCard className='textAlignLeft'>
                <h1 className='h1'>
                    Pocketing A Job
                </h1>
                <h3 className='h3'>
                    {`If we now go inside of our job board for culinary arts, we can see that we have an empty board. This board will contain a list of all the jobs we pocket within it to keep track of in our job search. Let's pocket our first job.`}
                </h3>
                <div className='flexGridWithOneImage'>
                    <div className='fiftyPercentWidth'>
                        <h3 className='h3'>
                        {`Clicking on the pocket a job button, a menu will pop up. In this menu, there will be a Job information section filled with multiple inputs. These multiple inputs are each of the columns we have for this job board. As we can see, one of the inputs is our custom input, and is asking us whether or not this job requires us to relocate. `}
                        </h3>
                        
                    </div>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image3}/>
                    </div>
                </div>

                <h3 className='h3'>
                    {`After filling in all of the inputs, We are able to pocket this job. However, we can also add follow up steps to do for this job once we have submitted our application. `}
                </h3>
                <hr className='hr'></hr>
                <div className='flexGridWithOneImage'>
                <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image4_1}/>
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image4_2}/>
                    </div>
                    <div className='fiftyPercentWidth'>
                        <h3 className='h3'>
                            {`Lets create a step and title it to do research for the company. Lets then add One more step and title it to reach out to the employer to follow up with the application. `}
                        </h3>
                        <h3 className='h3'>
                            {`As you can see, we can also add descriptions and due dates to each individual step. I am going to make our second step due a week from now. After entering in all this information we are again able to pocket this job.`}
                        </h3>
                    </div>
                </div>
                <h3 className='h3'>
                    {`Once We pocket the job we can see it has appeared on our job board.`}
                </h3>

                </GlassCard>
            </div>
            <div className='pocketedJobDetails'>
                <GlassCard className='textAlignLeft'>
                    <h1 className='h1'>Viewing Pocketed Job Details</h1>
                    <div className='flexGridWithImage'>
                        <div className='fiftyPercentWidth'>
                            <h3 className='h3'>
                                {`To view our pocketed job details, we are able to click the leftmost circle icon on each job row on the table, which redirects us to a page dedicated to that job.`}
                            </h3>
                            <h3 className='h3'>
                                {`Within this page we can do multiple things.`}
                            </h3>

                        </div>
                        <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image5}/>
                    </div>
                    </div>
                    <hr className='hr'></hr>
                    <h2>Edit The Pocketed Job</h2>
                    <h3 className='h3'>
                        {`Within the “Job Data Table” section of the pocketed job page, we can see a list of different information. We are able to edit this information by toggling the input and typing in whatever data we want. `}
                    </h3>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image6}/>
                    </div>
                    <h3 className='h3'>
                        {`After changing all of the pocketed job information, make sure you hit the save button to save all of your changes.`}
                    </h3>
                    <hr className='hr'></hr>
                    <h2>Creating Notes</h2>
                    <div className='flexGridWithImage'>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image7}/>
                    </div>
                        <div className='fiftyPercentWidth'>
                                <h3 className='h3'>
                                    {`Within this page you are also able to create notes! Simply hit the create a new note button, enter a title and a description into the note, save your changes, and your note is completed!`}
                                </h3>
                        </div>
                    </div>
                    <hr className='hr'></hr>
                    <h2>
                        {`Completing, Adding, and Editing steps`}
                    </h2>
                    <h3 className='h3'>Within the Steps section of this page, we can do multiple things with our previously created steps</h3>
                    <h3 className='h3'>We can set these steps as complete or incomplete</h3>
                    <div className='flexGridWithOneImage'>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image8}/>
                    </div>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image9}/>
                    </div>
                    </div>
                    <h3 className='h3'>
                        {`We can edit or delete any of our previous steps, and we can also add new steps if we so desire.`}
                    </h3>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image9_5}/>
                    </div>
                    <hr className='hr'></hr>
                    <h3 className='h3'>
                        {`It's also good to mention that if we go back to the homepage, we can see a list of to do’s. These to do are all of our steps that we have previously made for the job we have pocketed, with their corresponding due dates.`}
                    </h3>
                    <div 
                    className='flexImageDiv'
                    >
                        <Image className='image' alt='Image containing Pocketed Jobs Job Boards' src={image10}/>
                    </div>
                </GlassCard>
                <h1 
                style={{
                    textAlign: 'center'
                }}
                className='h1'>
                    {`To summarize this application, Pocket Jobs is a fantastic tool for people who want to keep track of their job applications and follow-up steps in an organized and efficient manner.`}
                </h1>

            </div>

        </div>
    )

}