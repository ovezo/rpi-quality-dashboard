import React, { useState } from 'react';

function ImageSelector({onSelectedImages}) {

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    onSelectedImages(files);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add Images</span>
      </button>
      <input
        id="fileInput"
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageSelector;
