
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';


const SideNav = () => {
  const {user} = useKindeBrowserClient();
   const [activeTeam,setActiveTeam] = useState<TEAM>()
  const createFile = useMutation(api.files.createFile);
 const convex = useConvex();

 const [totalFiles,setTotalFiles] = useState<Number>();
  const {fileList_,setFileList_} = useContext(FileListContext);

 useEffect(()=>{
  activeTeam&&getFiles();
 },[activeTeam]);


  const onFileCreate = (fileName:string) =>{
    console.log(fileName)
    const teamId = (activeTeam ? activeTeam._id : '') as string;
    const createdBy = (activeTeam ? activeTeam.createdBy : '') as string;



    createFile({
      fileName: fileName,
      teamId: teamId,
      createdBy: createdBy,
      archive: false,
      document: '',
      whiteboard: ''
    }).then((resp)=>{
   if(resp){
    getFiles();
    toast('File Created Sucessfully!!!')
   }
    },(e)=>{
      toast(['Error While Created File'])
    }
    
    )
  }

  const getFiles = async()=>{

     // Use a default string value if activeTeam is undefined
  const teamId = (activeTeam ? activeTeam._id : '') as string;

   const result = await convex.query(api.files.getFiles,{teamId:teamId});

   console.log(result);
   setFileList_(result);
   setTotalFiles(result?.length)
  }
  return (
    <div
    className=' h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'
    >

   <div className='flex-1'>
    <SideNavTopSection user = {user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/>
  </div>  

    <div>
      <SideNavBottomSection onFileCreate ={onFileCreate} totalFiles = {totalFiles}/>
    </div>
      </div>
  )
}

export default SideNav