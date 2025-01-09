import { useState } from "react";




export const useUrlCreator = (files)=>{
const [filesData,setFilesData]=useState([])

    Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const arrayBuffer = new Uint8Array(reader.result);
              const blob = new Blob([arrayBuffer],{type:file.type});
              console.log(blob)
              const imageUrl = URL.createObjectURL(blob);
               setFilesData((prev)=>[...prev,imageUrl])
            }
            reader.readAsArrayBuffer(file);
          });



}