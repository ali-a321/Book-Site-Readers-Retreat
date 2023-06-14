import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    onChange(file);
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFile ? (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="chosenImg" />
        </div>
      ) : (
        <p>Drag and drop an image file here or click to select the image.</p>
      )}
    </div>
  );
};

export default ImageUpload;
