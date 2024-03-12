
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from 'react'
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


const Canvas = ({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) => {

    const [whiteBoardData,setWhiteboardData] = useState<any>();

    const updateWhiteboard = useMutation(api.files.updateWhiteBoard)
       useEffect(()=>{
          onSaveTrigger&&saveWhiteboard();
       },[onSaveTrigger])

    
    const saveWhiteboard =()=>{
        // console.log(whiteBoardData)
        updateWhiteboard({
            _id: fileId,
            whiteboard:JSON.stringify(whiteBoardData)
         }).then(resp=>console.log(resp,'koooooo'))
    }
  return (
    <div style={{ height: "670px" }}>
   {fileData&&<Excalidraw 
     theme ='light'
     initialData = {{
        elements: fileData?.whiteboard&&JSON.parse(fileData.whiteboard)
     }}
     onChange={(excalidrawElements:any, appState:any, files:any) => setWhiteboardData(excalidrawElements)}
     UIOption = {{
        canvasAction:{
            export:false,
            toggleTheme:false
        }
     }}
    >

<MainMenu>
            <MainMenu.DefaultItems.ClearCanvas/>
            <MainMenu.DefaultItems.SaveAsImage/>
            <MainMenu.DefaultItems.ChangeCanvasBackground/>
        </MainMenu>
        <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint/>
            <WelcomeScreen.Hints.MenuHint/>
            <WelcomeScreen.Hints.ToolbarHint/>
            <WelcomeScreen.Center>
                <WelcomeScreen.Center.MenuItemHelp/>
            </WelcomeScreen.Center>
        </WelcomeScreen>

    </Excalidraw>}
  </div>
  )
}

export default Canvas