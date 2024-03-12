 "use client"
 
import React, { useState } from 'react'
import WorkSpaceHeade from '../_components/WorkSpaceHeade'
import EditorComp from '../_components/EditorComp'
const WorkSpace = ({params}:any) => {

  
  const [triggerSave,setTriggerSave] = useState(false);

   return (
    <div>
      <WorkSpaceHeade onSave={()=>setTriggerSave(!triggerSave)}/>

      {/* WorkSpace Layout */}

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document  */}
        
        <div className=''>
         <EditorComp onSaveTrigger = {triggerSave} fileId ={params.fileId}/>
        </div>
        {/* whiteboardCanvs */}
        <div className='bg-red-400 h-screen'>
       Canvas
        </div>
      </div>

    </div>
  )
}

export default WorkSpace