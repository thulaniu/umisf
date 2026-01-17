import React, { useEffect, useRef } from "react";
import Dropzone from "dropzone";

// Import the CSS styles mentioned in the docs
import "dropzone/dist/dropzone.css"; 

export default function MyDropzone({ onFileUploaded }) {
  // 1. Create a ref to hold the DOM element
  const dropzoneRef = useRef(null);

  useEffect(() => {
    // 2. Prevent Dropzone from auto-attaching (standard fix for React)
    Dropzone.autoDiscover = false;

    // 3. Initialize Dropzone on the referenced element
    // Ensure the ref exists before initializing
    if (dropzoneRef.current) {
        const myDropzone = new Dropzone(dropzoneRef.current, {
          url: "/your-upload-endpoint", // Set this to your actual API URL
          autoProcessQueue: false,      // Set to true if you want auto-upload
          addRemoveLinks: true,         // Adds "Remove" link to preview
          acceptedFiles: "image/*",
        });

        // 4. Handle events (like the "addedfile" example in your docs)
        myDropzone.on("addedfile", (file) => {
          console.log(`File added: ${file.name}`);
          // Pass the file back to the parent component if needed
          if (onFileUploaded) {
            onFileUploaded(file);
          }
        });
        
        // 5. Cleanup: Destroy the instance when component unmounts
        return () => {
          myDropzone.destroy();
        };
    }
  }, [onFileUploaded]);

  // 6. Render the div that Dropzone will attach to
  // We use the 'dropzone' class to pick up the default CSS styles
  return (
    <form 
      ref={dropzoneRef} 
      className="dropzone" 
      style={{ border: "2px dashed #0087F7", borderRadius: "5px", background: "white" }}
    >
      <div className="dz-message" data-dz-message>
        <span>Drop files here or click to upload</span>
      </div>
    </form>
  );
}