"use client"
import React, { useEffect, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import { useRef } from 'react';

const EditorComp = () => {

const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [
        {
        data: {
            text: 'Document Name',
            level:2
        },
        id:"123",
        type: 'header'
    },
    {
        data: {
           
            level:4
        },
        id:"1234",
        type: 'header'
    }

],
    "version" : "2.8.1"
}
  const ref = useRef();
   const [document,setDocument] = useState(rawDocument);

    useEffect(()=>{
        initEditor()
    },[])

    const initEditor = () =>{
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            tools:{
                header:{
                    class:Header,
                    shortcut:'CMD+SHIFT+H',
                    config:{
                        placeholder: 'Enter a Header'
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                  paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                  },
                  warning: Warning,

            },

            holder: 'editorjs',
            data: document
          });
          ref.current = editor;
    }
  return (
    <div>
        <div id='editorjs' className='ml-40'></div>
    </div>
  )
}

export default EditorComp