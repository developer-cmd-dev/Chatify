import imageCompression from 'browser-image-compression';
import { createFFmpeg,fetchFile } from "@ffmpeg/ffmpeg";




class ExtractFilesType {
  getFiles(filesData, type) {
    const types = filesData.filter((item) => item.type.slice(0, item.type.indexOf('/')) == type);
    return types;
  }
}


export const useCompressFiles = async (files) => {
  const file = await files;
  let fileArr = [...file];

  const extractedData = new ExtractFilesType();
  const imagesFromFile = extractedData.getFiles(fileArr, 'image');
  const videosFromFile = extractedData.getFiles(fileArr, 'video');
  const audiosFromFile = extractedData.getFiles(fileArr, 'audio');
  const documentsFromFile = extractedData.getFiles(fileArr, 'application');
  console.log(imagesFromFile, videosFromFile, audiosFromFile, documentsFromFile);



  // For Image Compression.
  if (imagesFromFile.length > 0) {
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

  if (videosFromFile.length > 0) {
    try {
      const ffmpeg = createFFmpeg({ log: true });
      if (!ffmpeg.isLoaded) {
        await ffmpeg.load()
      };

      await ffmpeg;
      const resp = Promise.all(videosFromFile.map(async (video) => {
        const videoName = video.name;
        const compressedName = `compressed_${videoName}`;
        ffmpeg.FS("writeFile", videoName, await fetchFile(video));
        await ffmpeg.run(
          "-i", 
          videoName, 
          "-vcodec", 
          "libx264", 
          "-crf", 
          "28", 
          compressedName
        );
        const compressedData = ffmpeg.FS("readFile", compressedName);

        // Create a Blob URL for the compressed video
        const compressedBlob = new Blob([compressedData.buffer], { type: "video/mp4" });
        const compressedURL = URL.createObjectURL(compressedBlob);
        return compressedURL;

      }))

      console.log(resp)

    } catch (error) {
      console.log(error)
    }




  }






}