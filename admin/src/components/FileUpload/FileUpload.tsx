import { DropzoneArea } from "material-ui-dropzone";
import React from "react";

const UploadFile: React.FC<{
  handleFileChange: (files: File[]) => void;
}> = ({ handleFileChange }) => {
  return (
    <>
      <DropzoneArea onChange={handleFileChange} />
    </>
  );
};

export default UploadFile;
