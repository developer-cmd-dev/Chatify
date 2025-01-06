import imageCompression from 'browser-image-compression';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojsRecord from "videojs-record";



export const useCompressFiles = async (files) => {
  const file = await files;
  let fileArr = [...file];
  const imagesFromFile = fileArr.filter((item)=>item.type.slice(0,item.type.indexOf('/'))=='image');
  const videosFromFile = fileArr.filter((item)=>item.type.slice(0,item.type.indexOf('/'))=='video');
  const audiosFromFile = fileArr.filter((item)=>item.type.slice(0,item.type.indexOf('/'))=='audio');
  const documentsFromFile = fileArr.filter((item)=>item.type.slice(0,item.type.indexOf('/'))=='application');


  // For Image Compression.
  if (imagesFromFile.length >0) {
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true, // Use a web worker for better performance
    };
    try {
      const resp = await Promise.all(fileArr.map(async (elements) => {
        return await imageCompression(elements, options);
      }))

    //  return await resp
    } catch (error) {
      return error
    }


  }

  // For video Compression

  if(videosFromFile.length >0){
   try {
    const videoElement = document.getElementById("videoPlayer");
    const player = videojs(videoElement, {
      controls: true,
      width: 640,
      height: 360,
      plugins: {
        record: {
          video: true,
          audio: true,
          maxLength: 30, // Limit video length (optional)
          quality: 0.5, // Reduce video quality to compress
        },
      },
    });

    player.on("finishRecord", function () {
      const compressedBlob = player.recordedData.video;
      const compressedUrl = URL.createObjectURL(compressedBlob);
      console.log(compressedUrl)
    });
     

   } catch (error) {
    console.log(error)
   }





  }








}