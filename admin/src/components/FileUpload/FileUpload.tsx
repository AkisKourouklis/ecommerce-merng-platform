import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

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
