 "use client"
 
import React, { useEffect, useState } from 'react'
import WorkSpaceHeade from '../_components/WorkSpaceHeade'
import EditorComp from '../_components/EditorComp'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
const WorkSpace = ({params}:any) => {

  
  const [triggerSave,setTriggerSave] = useState(false);
 const convex = useConvex();
   const [fileData,setFileData] = useState<FILE|any>();

 useEffect(()=>{
    params.fileId&&getFileData();
 },[])
 const getFileData = async() =>{
    const result = await convex.query(api.files.getFileById,{_id:params.fileId});
    setFileData(result);
 }
   return (
    <div>
      <WorkSpaceHeade onSave={()=>setTriggerSave(!triggerSave)}/>

      {/* WorkSpace Layout */}

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document  */}
        
        <div className=''>
         <EditorComp onSaveTrigger = {triggerSave} fileId ={params.fileId}  fileData = {fileData}/>
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