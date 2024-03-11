
import { ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';


const SideNav = () => {
  const {user} = useKindeBrowserClient();
   const [activeTeam,setActiveTeam] = useState<TEAM>()
  const createFile = useMutation(api.files.createFile);
 const convex = useConvex();

 const [totalFiles,setTotalFiles] = useState<Number>();

 useEffect(()=>{
  activeTeam&&getFiles();
 },[activeTeam]);


  const onFileCreate = (fileName:string) =>{
    console.log(fileName)

    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
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
   const result = await convex.query(api.files.getFiles,{teamId:activeTeam?._id});

   console.log(result);
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