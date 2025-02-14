import React from 'react';
import TextButton from '../../components/buttons/TextButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { DriveFileRenameOutline, Edit, EditNoteOutlined, UploadOutlined } from '@mui/icons-material';

function Header() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className='grid grid-flow-col justify-start sm:justify-end gap-8'>
          <div>
            <div className="text-sm">Location:</div>
            <h2 className="text-md font-bold">Boots Burton Warehouse</h2>
          </div>
          <div>
            <div className="text-sm">Capacity:</div>
            <h2 className="text-md font-bold">200 per hour</h2>
          </div>
          <div>
            <div className="text-sm">Category:</div>
            <h2 className="text-md font-bold">Packaging</h2>
          </div>
        </div>
        <div className="grid grid-flow-col justify-end sm:justify-end gap-2">
          <TextButton Icon={<UploadOutlined/>}>Export</TextButton>
          <PrimaryButton Icon={<DriveFileRenameOutline/>} onClick={(e)=>{e.stopPropagation(); setOperatorModal(true)}}>Update Information</PrimaryButton>
        </div>
      </div>
      <div className="flex space-x-8">
        
      </div>
      <hr/>

    </div>
  );
}

export default Header;