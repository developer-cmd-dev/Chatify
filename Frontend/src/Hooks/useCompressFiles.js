import imageCompression from 'browser-image-compression';



  function getFiles(filesData, type) {
    const types = filesData.filter((item) => item.type.slice(0, item.type.indexOf('/')) == type);
    return types;
  }



export const useCompressFiles = async (files) => {

  const file = await files;
  let fileArr = [...file];

  const imagesFromFile =await getFiles(fileArr, 'image');
  const videosFromFile =await getFiles(fileArr, 'video');
  const audiosFromFile =await getFiles(fileArr, 'audio');
  const documentsFromFile =await getFiles(fileArr, 'application');
  let response = [];


  // For Image Compression.
  if (imagesFromFile.length > 0) {
    const options = {
      maxSizeMB: 1, 
      maxWidthOrHeight: 800, 
      useWebWorker: true,
    };
    try {
      const resp = await Promise.all(fileArr.map(async (elements) => {
        return await imageCompression(elements, options);
      }))

      response.push(...resp);
     
    } catch (error) {
      return error
    }
 


  }

  // For video Compression
  if(videosFromFile.length >0){
    videosFromFile.map((elem)=>response.push(elem))
  }  
  
  if(audiosFromFile.length >0){
    audiosFromFile.map((elem)=>response.push(elem))
  }

  if(documentsFromFile.length >0){
    audiosFromFile.map((elem)=>response.push(elem))
  }


console.log(response)

return  response





}