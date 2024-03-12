import React from 'react'
import WorkSpaceHeade from '../_components/WorkSpaceHeade'
import EditorComp from '../_components/EditorComp'
const WorkSpace = () => {
  return (
    <div>
      <WorkSpaceHeade/>

      {/* WorkSpace Layout */}

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document  */}
        
        <div className=''>
         <EditorComp/>
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