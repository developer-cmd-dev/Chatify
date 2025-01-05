import imageCompression from 'browser-image-compression';



export const useCompressFiles = async(files)=>{
// const [compressedFiles,setCompressedFiles] = useState([]);
const file = await files;
let fileArr = [...file];

if(fileArr.some((file)=>file.type.slice(0,file.type.indexOf('/'))=='image')){
    const options = {
        maxSizeMB: 1, // Maximum file size in MB
        maxWidthOrHeight: 800, // Max width or height in pixels
        useWebWorker: true, // Use a web worker for better performance
      };

      try {
       const resp = await Promise.all(fileArr.map(async(elements,index)=>{
            return await imageCompression(elements,options);           
        }))

        return resp
      } catch (error) {
        return error
      }


}








}